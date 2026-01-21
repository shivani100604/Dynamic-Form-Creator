import React, { useState } from 'react';
import './App.css';

function App() {
  const [fields, setFields] = useState([]);

  // Naya field add karne ke liye function
  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type: type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      value: ''
    };
    setFields([...fields, newField]);
  };

  // Field delete karne ke liye function
  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  // Form reset karne ke liye
  const resetForm = () => setFields([]);

  // Submit handle karne ke liye
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Captured Data:", fields);
    alert("Check console for form data!");
  };

  return (
    <div className="main-container">
      {/* Sidebar Controls */}
      <div className="control-panel">
        <h1>Form Creator</h1>
        <p>Click to add fields dynamically:</p>
        <div className="btn-group">
          <button onClick={() => addField('text')}>+ Text Input</button>
          <button onClick={() => addField('email')}>+ Email Input</button>
          <button onClick={() => addField('password')}>+ Password</button>
          <button onClick={() => addField('number')}>+ Number</button>
        </div>
        <button className="reset-btn" onClick={resetForm}>Reset All</button>
      </div>

      {/* Live Preview */}
      <div className="preview-panel">
        <h2>Live Form Preview</h2>
        {fields.length === 0 ? (
          <div id="empty-state">No fields added yet. Your form is empty.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.id} className="form-group">
                <label>{field.label}</label>
                <input type={field.type} placeholder={`Enter ${field.type}...`} />
                <button 
                  type="button" 
                  className="remove-btn" 
                  onClick={() => removeField(field.id)}
                >✕</button>
              </div>
            ))}
            <button type="submit" className="submit-btn">Submit Form</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
