// App.js

import './App.css';

import ChatContainer from './components/ChatContainer';
import LeftPanel from './components/LeftPanel';
import NavBar from './components/NavBar';
import React from 'react';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main-content">
        <LeftPanel />
        <div className="chat-wrapper">
          <div className="chat-section">
            <p>Conversation 1</p>
            <ChatContainer fetchUrl="http://localhost:3001" />
          </div>
          <div className="chat-section">
            <p>Conversation 2</p>
            <ChatContainer fetchUrl="http://localhost:3001" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
