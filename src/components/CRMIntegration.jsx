// src/components/CRMIntegration.jsx

import React, { useState } from 'react';
import './CRMIntegration.css';

export default function CRMIntegration({ mediaId }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const push = async () => {
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch(`http://localhost:5000/crm/push/${mediaId}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('CRM push failed');
      setStatus('✅ Pushed to CRM');
    } catch (err) {
      console.error(err);
      setStatus('⚠️ Push failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crm-card--netflix">
      <h3 className="crm-title">CRM Integration</h3>

      <button
        className="crm-btn"
        onClick={push}
        disabled={loading}
      >
        {loading ? '⏳ Pushing...' : '📤 Push to CRM'}
      </button>

      {status && <p className={`crm-status ${status.startsWith('✅') ? 'success' : 'error'}`}>{status}</p>}
    </div>
  );
}
