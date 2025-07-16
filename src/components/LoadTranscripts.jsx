// src/components/LoadTranscripts.jsx

import React, { useState } from 'react';
import './LoadTranscripts.css';

export default function LoadTranscripts() {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/load-transcripts', {
        method: 'POST',
      });
      const data = await res.json();
      setMsg(data.success ? '✅ Indexed transcripts' : `❌ ${data.message}`);
    } catch {
      setMsg('❌ Failed to index transcripts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="load-card--netflix">
      <h3 className="load-title">Index Transcripts for RAG</h3>
      <button
        className="load-btn"
        onClick={handleLoad}
        disabled={loading}
      >
        {loading ? '⏳ Loading…' : '📑 Load & Index'}
      </button>
      {msg && (
        <p className={`load-msg ${msg.startsWith('✅') ? 'success' : 'error'}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
