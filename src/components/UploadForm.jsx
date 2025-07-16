import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({ hcpName: '', speciality: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!file) {
      setError('🔴 Please select a media file.');
      return;
    }

    try {
      const fd = new FormData();
      fd.append('media', file);
      fd.append('metadata', JSON.stringify(meta));

      const res = await axios.post('http://localhost:5000/upload', fd);
      const { media_id } = res.data;

      setMessage(`✅ Uploaded! ID: ${media_id}`);
      onUploadSuccess(media_id);
      setFile(null);
      setMeta({ hcpName: '', speciality: '' });
    } catch (err) {
      console.error(err);
      setError('⚠️ Upload failed. Try again.');
    }
  };

  return (
    <div className="upload-card-row">
      {/* Left part - glowing input */}
      <div className="left-glow">
        <div className="input-div">
          <input
            type="file"
            className="input"
            accept="audio/*,video/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <span className="icon" title="Click to upload">⬆️</span>
        </div>
      </div>

      {/* Right part - form fields */}
      <div className="right-form">
        <h2>Upload Recording</h2>

        {message && <p className="upload-msg success">{message}</p>}
        {error && <p className="upload-msg error">{error}</p>}

        <form onSubmit={submit} className="upload-form">
          <div className="field">
            <label>HCP Name</label>
            <input
              type="text"
              placeholder="Dr. Jane Doe"
              value={meta.hcpName}
              onChange={e => setMeta(m => ({ ...m, hcpName: e.target.value }))}
            />
          </div>

          <div className="field">
            <label>Specialty</label>
            <input
              type="text"
              placeholder="Cardiology"
              value={meta.speciality}
              onChange={e => setMeta(m => ({ ...m, speciality: e.target.value }))}
            />
          </div>

          <button type="submit" className="upload-btn">Upload & Transcribe</button>
        </form>
      </div>
    </div>
  );
}
