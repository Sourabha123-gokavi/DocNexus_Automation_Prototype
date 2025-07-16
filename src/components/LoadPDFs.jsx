// src/components/LoadPDFs.jsx
import React, { useState } from 'react';

export default function LoadPDFs() {
  const [msg, setMsg] = useState('');

  const handleLoad = async () => {
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/load-pdfs', {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) setMsg('✅ PDFs indexed successfully');
      else setMsg(`❌ ${data.message}`);
    } catch (err) {
      console.error(err);
      setMsg('❌ Failed to index PDFs');
    }
  };

  return (
    <div className="card">
      <h2>Step 5: Index PDFs for RAG</h2>
      <button className="btn" onClick={handleLoad}>
        Load & Index PDFs
      </button>
      {msg && <p className="loading">{msg}</p>}
    </div>
  );
}
