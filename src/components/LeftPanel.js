// components/LeftPanel.js
import React from 'react';

function LeftPanel() {
  return (
    <div className="left-panel">
      <h2>Options</h2>
      <form>
        <div className="radio-group">
          <label>
            <input type="radio" name="option" value="option1" />
            Option 1
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input type="radio" name="option" value="option2" />
            Option 2
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input type="radio" name="option" value="option3" />
            Option 3
          </label>
        </div>
      </form>
    </div>
  );
}

export default LeftPanel;
