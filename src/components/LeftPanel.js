import React, { useEffect, useState } from 'react';

import ProlificIdDialog from './ProlificIdDialog'; // Import the Dialog component
import axios from 'axios';

// Function to generate a UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function RadioGroup({ question, name, label, value, onChange }) {
  return (
    <div className="radio-group">
      <p>{label} {question}</p>
      <label>
        <input 
          type="radio" 
          name={name} 
          value="option1" 
          checked={value === 'option1'} 
          onChange={onChange} 
        />
        Conversation 1
      </label>
      <label>
        <input 
          type="radio" 
          name={name} 
          value="option2" 
          checked={value === 'option2'} 
          onChange={onChange} 
        />
        Conversation 2
      </label>
    </div>
  );
}

function TextareaGroup({ question, name, label, value, onChange }) {
  return (
    <div className="textarea-group" style={{ display: 'flex', flexDirection: 'row' }}>
      <p style={{ fontWeight: 'bold' }}>{label} {question}</p>
    </div>
  );
}

function LeftPanel({ onNext, onPrevious, isComplete, section, formData, updateFormData }) {
  const [localFormData, setLocalFormData] = useState(formData);
  const [prolificId, setProlificId] = useState('');
  const [uuid, setUuid] = useState('');
  const [persona, setPersona] = useState('');
  const [dialogOpen, setDialogOpen] = useState(true);

  useEffect(() => {
    // Check if a UUID is already stored in localStorage
    let storedUuid = localStorage.getItem('uuid');
    if (!storedUuid) {
      // Generate a new UUID and store it in localStorage
      storedUuid = generateUUID();
      localStorage.setItem('uuid', storedUuid);
    }
    setUuid(storedUuid);

    // Check if Prolific ID is already stored in localStorage
    const storedProlificId = localStorage.getItem('prolificId');
    if (storedProlificId) {
      setProlificId(storedProlificId);
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }

    if (section === 1 || section === 2) {
      setPersona('You are Emily, a 30-year-old financial analyst working at Quantum Bank');
    } else {
      setPersona('BannaLoft is a company that exclusively sells banana boats, no tours, no swimming suits. BannaLoft is only located in San Francisco');
    }
  }, [section]);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleDialogClose = (pid) => {
    if (pid) {
      setProlificId(pid);
      localStorage.setItem('prolificId', pid);
    }
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value
    });
  };

  const handleNext = async () => {
    updateFormData(localFormData);
    try {
      const response = await axios.post('/submit-survey', {
        prolific_id: prolificId,
        uuid: uuid,
        data: { [`session${section}`]: localFormData }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving survey response:', error);
    }
    setLocalFormData({ consistency: '', naturalness: '', engagement: '', probingQuestion1: '', probingQuestion2: '', probingQuestion3: '' });
    onNext();
  };

  const handlePrevious = () => {
    updateFormData(localFormData);
    onPrevious();
  };

  const isNextDisabled = !(
    localFormData.consistency &&
    localFormData.naturalness &&
    localFormData.engagement &&
    localFormData.probingQuestion1 &&
    localFormData.probingQuestion2 &&
    localFormData.probingQuestion3
  );

  return (
    <div className="left-panel">
      <h2>Section {section}</h2>
      Read through the conversations and evaluate
      <h4>Persona: {persona}</h4>
      {isNextDisabled && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
          Please select all options before proceeding.
        </p>
      )}
      <ProlificIdDialog open={dialogOpen} onClose={handleDialogClose} />
      <form>
        <RadioGroup 
          question="In which conversation is Bot1 more consistent?" 
          name="consistency" 
          label="1)" 
          value={localFormData.consistency} 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="In which conversation is Bot1 more natural?" 
          name="naturalness" 
          label="2)" 
          value={localFormData.naturalness} 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="In which conversation is Bot1 more engaging?" 
          name="engagement" 
          label="3)" 
          value={localFormData.engagement} 
          onChange={handleChange} 
        />
        <TextareaGroup 
          question="Annotate parts of the conversation that you feel are natural or unnatural" 
          name="unnaturalParts" 
          label="4)" 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="Which conversation answered the probing question better?" 
          name="probingQuestion1" 
          label="5)" 
          value={localFormData.probingQuestion1} 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="Which conversation answered the probing question better?" 
          name="probingQuestion2" 
          label="6)" 
          value={localFormData.probingQuestion2} 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="Which conversation answered the probing question better?" 
          name="probingQuestion3" 
          label="7)" 
          value={localFormData.probingQuestion3} 
          onChange={handleChange} 
        />
      </form>
      {section > 1 && (
        <button
          style={{
            backgroundColor: '#f44336', /* Red background */
            border: 'none',             /* Remove borders */
            color: 'white',             /* White text */
            padding: '15px 32px',  
            textAlign: 'center', 
            fontWeight: '800',       
            textDecoration: 'none',     /* Remove underline */
            display: 'inline-block',    /* Make the button inline */
            fontSize: '16px',           /* Increase font size */
            margin: '4px 2px',          /* Some margin */
            cursor: 'pointer',          /* Pointer/hand icon on hover */
            borderRadius: '12px'        /* Rounded corners */
          }}
          onClick={handlePrevious}
        >
          Previous
        </button>
      )}
      
      <button
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          fontWeight: '800',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer',
          borderRadius: '12px'
        }}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        {section === 4 ? 'Complete Survey' : 'Next'}
      </button>
    </div>
  );
}

export default LeftPanel;
