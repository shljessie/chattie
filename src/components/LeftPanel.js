import React from 'react';

function RadioGroup({ question, name, label }) {
  return (
    <div className="radio-group">
      <label className="question-label">{label}</label>
      <p>{question}</p>
      <label>
        <input type="radio" name={name} value="option1" />
        Conversation 1
      </label>
      <label>
        <input type="radio" name={name} value="option2" />
        Conversation 2
      </label>
    </div>
  );
}
// highlight 10, 15, 18 or sth 
function LeftPanel() {
  return (
    <div className="left-panel">
      <h2>Section 1</h2>

      <h4>Persona:</h4>

      <h4>Probe Questions:</h4>
      

      <form>
        <RadioGroup 
          question="In which conversation is Bot1 more consistent?" 
          name="consistency" 
          label="Question 1"
        />
        <RadioGroup 
          question="In which conversation is Bot1 more natural?" 
          name="naturalness" 
          label="Question 2"
        />
        <RadioGroup 
          question="In which conversation is Bot1 more engaging?" 
          name="engagement" 
          label="Question 3"
        />
      </form>

      <button>Next</button>
    </div>
  );
}

export default LeftPanel;
