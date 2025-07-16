// src/components/TranscriptEditor.jsx

import React, { useEffect, useState } from 'react';
import './TranscriptEditor.css';

export default function TranscriptEditor({ mediaId }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mediaId) return;
    setLoading(true);
    setError('');
    setStatus('Loading transcript…');

    fetch(`http://localhost:5000/transcript/${mediaId}`)
      .then(res => {
        if (!res.ok) throw new Error('Transcript not ready');
        return res.json();
      })
      .then(d => {
        if (!d.transcript?.trim()) {
          throw new Error('Transcript not available');
        }
        setText(d.transcript);
        setStatus('Transcript loaded.');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [mediaId]);

  const save = () => {
    setLoading(true);
    setError('');
    setStatus('Saving transcript…');

    fetch(`http://localhost:5000/transcript/${mediaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: text }),
    })
      .then(res => res.json())
      .then(d => {
        if (d.success) setStatus(d.message || 'Transcript updated.');
        else throw new Error(d.message || 'Update failed');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="transcript-card--netflix">
      <h3 className="transcript-title">Transcript Editor</h3>

      {loading && <p className="transcript-status">{status}</p>}
      {error && <p className="transcript-error">{error}</p>}

      <textarea
        className="transcript-textarea"
        rows={12}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Transcript will appear here..."
        disabled={!!error}
      />

      <button
        className="transcript-save-btn"
        onClick={save}
        disabled={loading || !text.trim()}
      >
        💾 Save Changes
      </button>
    </div>
  );
}
