import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [model, setModel] = useState("llama3.2");
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8001/query", {
        model: model,
        query: query,
      });
      const newMessage = { user: query, response: res.data.response };
      setChatHistory([...chatHistory, newMessage]);
      setQuery("");
    } catch (error) {
      setError("Failed to fetch response. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Local LLM Chat App</h1>
      <div>
        <label>
          Select Model:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="llama3.2">llama3.2</option>
            <option value="other_model">other_model</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Enter your query:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Chat History:</h2>
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div key={index}>
              <p>
                <strong>You:</strong> {message.user}
              </p>
              <p>
                <strong>LLM:</strong> {message.response}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
