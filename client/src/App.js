import React, { useState } from 'react';
import './App.css';

function App() {
  const [fields, setFields] = useState([]);

  // Buttons click fix: Unique ID ke saath field add karna
  const addField = (type) => {
    const newField = {
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      label: `${type.toUpperCase()} Input`,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div className="form-builder-container">
      <div className="glass-sidebar">
        <h2 className="glow-text">Form Creator</h2>
        <div className="control-buttons">
          <button className="add-btn" onClick={() => addField('text')}>+ Text Field</button>
          <button className="add-btn" onClick={() => addField('email')}>+ Email Field</button>
          <button className="add-btn" onClick={() => addField('number')}>+ Number Field</button>
          <button className="add-btn" onClick={() => addField('password')}>+ Password</button>
        </div>
        <button className="reset-btn" onClick={() => setFields([])}>Clear Form</button>
      </div>

      <div className="preview-area">
        <h2 className="preview-title">Live Preview</h2>
        <div className="form-canvas">
          {fields.length === 0 ? (
            <p className="empty-msg">Your form is empty. Add fields to see magic! ✨</p>
          ) : (
            <form className="dynamic-form">
              {fields.map((field) => (
                <div key={field.id} className="form-card animate-in">
                  <label>{field.label}</label>
                  <div className="input-wrapper">
                    <input type={field.type} placeholder={`Enter ${field.type}...`} />
                    <button type="button" className="del-icon" onClick={() => removeField(field.id)}>✕</button>
                  </div>
                </div>
              ))}
              <button type="submit" className="submit-form-btn">Generate Form JSON</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
