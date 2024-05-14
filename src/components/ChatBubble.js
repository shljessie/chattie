import PropTypes from 'prop-types';
import React from 'react';

const ChatBubble = ({ text, isBot1 }) => {
  return (
    <div className={`chat-bubble ${isBot1 ? 'bot1-bubble' : 'bot2-bubble'}`}>
      {text}
    </div>
  );
};

ChatBubble.propTypes = {
  text: PropTypes.string.isRequired,
  isBot1: PropTypes.bool.isRequired,
};

export default ChatBubble;
