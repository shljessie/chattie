import React, { useEffect, useState } from 'react';

import ChatBubble from './ChatBubble';

const ChatContainer = ({ fetchUrl, containerId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [fetchUrl]);

  const renderChatBubbles = () => {
    return data.map((messagePair, index) => {
      const bot1Message = messagePair['Bot 1'];
      const bot2Message = messagePair['Bot 2'];

      return (
        <div key={index}>
          <ChatBubble text={bot2Message} isBot1={false} index={index} botTitle="Bot2" containerId={containerId} />
          <ChatBubble text={bot1Message} isBot1={true} index={index} botTitle="Bot1" containerId={containerId} />
        </div>
      );
    });
  };

  return (
    <div className="chat-inner-wrapper">
      <div className="chat-container" id={containerId}>
        {renderChatBubbles()}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => document.getElementById(`${containerId}-chat-turn-11`).scrollIntoView()}>Probing 1</button>
        <button onClick={() => document.getElementById(`${containerId}-chat-turn-14`).scrollIntoView()}>Probing 2</button>
        <button onClick={() => document.getElementById(`${containerId}-chat-turn-17`).scrollIntoView()}>Probing 3</button>
      </div>
    </div>
  );
};

export default ChatContainer;
