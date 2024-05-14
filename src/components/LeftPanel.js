import React, { useEffect, useState } from 'react';

function RadioGroup({ question, name, label, value, onChange }) {
  return (
    <div className="radio-group">
      <label className="question-label">{label}</label>
      <p>{question}</p>
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

function LeftPanel({ onNext, onPrevious, isComplete, section, formData, updateFormData }) {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value
    });
  };

  const handleNext = () => {
    updateFormData(localFormData);
    setLocalFormData({ consistency: '', naturalness: '', engagement: '' });
    onNext();
  };

  const handlePrevious = () => {
    updateFormData(localFormData);
    onPrevious();
  };

  return (
    <div className="left-panel">
      <h2>Section {section}</h2>
      <h4>Persona:</h4>
      <h4>Probe Questions:</h4>
      <form>
        <RadioGroup 
          question="In which conversation is Bot1 more consistent?" 
          name="consistency" 
          label="Question 1" 
          value={localFormData.consistency} 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="In which conversation is Bot1 more natural?" 
          name="naturalness" 
          label="Question 2" 
          value={localFormData.naturalness} 
          onChange={handleChange} 
        />
        <RadioGroup 
          question="In which conversation is Bot1 more engaging?" 
          name="engagement" 
          label="Question 3" 
          value={localFormData.engagement} 
          onChange={handleChange} 
        />
      </form>
      {section > 1 && <button onClick={handlePrevious}>Previous</button>}
      <button onClick={handleNext}>{section === 4 ? 'Complete Survey' : 'Next'}</button>
    </div>
  );
}

export default LeftPanel;
