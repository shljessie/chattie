import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/bootstrap.css';

import React, { useEffect, useRef } from 'react';

import MediumEditor from 'medium-editor';
import PropTypes from 'prop-types';

const ChatBubble = ({ text, isBot1 }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new MediumEditor(editorRef.current, {
      toolbar: {
        buttons: [{
          name: 'anchor',
          tagNames: ['annotate'],
          style: { prop: 'font-weight', value: '700|bold' },
          contentDefault: '<b>Annotate</b>',
          useQueryState: 'false'
        }]
      },
      placeholder: {
        text: 'Type your text',
        hideOnClick: true
      },
      anchor: {
        customClassOption: null,
        customClassOptionText: 'Button',
        linkValidation: false,
        placeholderText: 'Annotate text here',
        targetCheckbox: false,
        targetCheckboxText: 'Open in new window'
      }
    });

    const handleKeydown = (event) => {
      // Prevent any keypress that would add new text
      const keysAllowed = [
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', 
        'Control', 'Meta', 'Shift', 'Alt', 'Escape', 'Tab', 'CapsLock', 
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
      ];

      if (!keysAllowed.includes(event.key)) {
        event.preventDefault();
      }
    };

    const editorElement = editorRef.current;

    if (editorElement) {
      editorElement.setAttribute('contenteditable', 'true');
      editorElement.addEventListener('keydown', handleKeydown);
    }

    // Clean up on unmount
    return () => {
      if (editorElement) {
        editorElement.removeEventListener('keydown', handleKeydown);
      }
      editor.destroy();
    };
  }, []);

  return (
    <div className={`chat-bubble ${isBot1 ? 'bot1-bubble' : 'bot2-bubble'}`}>
      <div ref={editorRef} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

ChatBubble.propTypes = {
  text: PropTypes.string.isRequired,
  isBot1: PropTypes.bool.isRequired,
};

export default ChatBubble;
