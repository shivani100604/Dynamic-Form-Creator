import React, { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import sampleForm from "./sampleForm.json";

export default function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (data) => {
    setSubmittedData(data);
    console.log("Form Submitted:", data);
  };

  return (
    <div className="app">
      <DynamicForm schema={sampleForm} onSubmit={handleSubmit} />
      {submittedData && (
        <pre>
          <h3>Submitted JSON:</h3>
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      )}
    </div>
  );
}
