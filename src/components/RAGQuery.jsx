// src/components/RAGQuery.jsx

import React, { useState } from 'react';
import './RAGQuery.css';

export default function RAGQuery() {
  const [query, setQuery]     = useState('');
  const [answer, setAnswer]   = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setError('');
    setAnswer('');
    if (!query.trim()) {
      setError('⚠️ Please enter a question.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (data.success) setAnswer(data.answer);
      else setError(`❌ ${data.message}`);
    } catch (err) {
      console.error(err);
      setError('❌ RAG query failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rag-card--netflix">
      <h3 className="rag-title">Ask Insights (RAG)</h3>

      {error && <p className="rag-error">{error}</p>}

      <textarea
        className="rag-input"
        rows={2}
        placeholder="Enter your question..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <button
        className="rag-btn"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? '⏳ Asking…' : '❓ Ask'}
      </button>

      {answer && (
        <div className="rag-answer">
          <h4>Answer</h4>
          <pre>{answer}</pre>
        </div>
      )}
    </div>
  );
}
