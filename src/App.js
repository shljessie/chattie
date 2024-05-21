import './App.css';

import React, { useState } from 'react';

import ChatContainer from './components/ChatContainer';
import LeftPanel from './components/LeftPanel';
import NavBar from './components/NavBar';

function App() {
  const [type, setType] = useState('profile');
  const [num, setNum] = useState(1);
  const [section, setSection] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState([
    { consistency: '', naturalness: '', engagement: '' },
    { consistency: '', naturalness: '', engagement: '' },
    { consistency: '', naturalness: '', engagement: '' },
    { consistency: '', naturalness: '', engagement: '' },
  ]);

  // Replace with UUID
  const prolificId = "Prolific ID: 123456";

  const handleNext = () => {
    if (type === 'profile' && num === 2) {
      setType('knowledge');
      setNum(1);
      setSection((prevSection) => Math.min(prevSection + 1, 4));
    } else if (type === 'knowledge' && num === 2) {
      setIsComplete(true);
      setSection((prevSection) => Math.min(prevSection + 1, 4));
    } else {
      setNum((prevNum) => prevNum + 1);
      setSection((prevSection) => Math.min(prevSection + 1, 4));
    }
  };

  const handlePrevious = () => {
    if (isComplete) {
      setIsComplete(false);
      setNum(2);
      setType('knowledge');
      setSection((prevSection) => Math.max(prevSection - 1, 1));
    } else if (type === 'knowledge' && num === 1) {
      setType('profile');
      setNum(2);
      setSection((prevSection) => Math.max(prevSection - 1, 1));
    } else {
      setNum((prevNum) => prevNum - 1);
      setSection((prevSection) => Math.max(prevSection - 1, 1));
    }
  };

  const updateFormData = (newData) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[section - 1] = newData;
      return updatedFormData;
    });
  };

  return (
    <div className="App">
      <NavBar  prolificId={prolificId} />
      <div className="main-content">
        <LeftPanel
          onNext={handleNext}
          onPrevious={handlePrevious}
          isComplete={isComplete}
          section={section}
          formData={formData[section - 1]}
          updateFormData={updateFormData}
        />
        <div className="chat-wrapper">
          <div className="chat-section">
            <p>Conversation 1</p>
            <ChatContainer containerId="conversation1"  fetchUrl={`http://localhost:3001/load-csv?type=${type}&stage=base&num=${num}`} />
          </div>
          <div className="chat-section">
            <p>Conversation 2</p>
            <ChatContainer containerId="conversation2" fetchUrl={`http://localhost:3001/load-csv?type=${type}&stage=finetune&num=${num}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
