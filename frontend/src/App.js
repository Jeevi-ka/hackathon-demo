import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Text Processor</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />

      <br /><br />

      <button onClick={handleSubmit}>Send</button>

      <h3>{result}</h3>
    </div>
  );
}

export default App;