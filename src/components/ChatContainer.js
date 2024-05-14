import React, { useEffect, useState } from 'react';

import ChatBubble from './ChatBubble';

const ChatContainer = ({ fetchUrl }) => {
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
          <ChatBubble text={bot2Message} isBot1={false} />
          <ChatBubble text={bot1Message} isBot1={true} />
        </div>
      );
    });
  };

  return <div className="chat-container">
        {renderChatBubbles()}
        </div>;
};

export default ChatContainer;
