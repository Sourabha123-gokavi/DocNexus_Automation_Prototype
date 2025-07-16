import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate
} from 'react-router-dom';

import UploadForm       from './components/UploadForm';
import MediaManager     from './components/MediaManager';
import TranscriptEditor from './components/TranscriptEditor';
import CRMIntegration   from './components/CRMIntegration';
import LoadTranscripts  from './components/LoadTranscripts';
import RAGQuery         from './components/RAGQuery';
import './style.css';

function App() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleDownloadSummary = () => {
    if (!selectedMedia) {
      alert("Please select a recording first from Recordings.");
      return;
    }

    const url = `http://localhost:5000/generate-summary/${selectedMedia}`;
    window.open(url, '_blank');
  };

  return (
    <Router>
      <div className="app--netflix">
        {/* Navbar */}
        <nav className="navbar--netflix">
          <div className="logo">DocNexus AI</div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ul className="nav-links">
              <li><NavLink to="/recordings">Recordings</NavLink></li>
              <li><NavLink to="/transcripts">Transcripts</NavLink></li>
              <li><NavLink to="/load-transcripts">Load</NavLink></li>
              <li><NavLink to="/insights">Insights</NavLink></li>
              <li><NavLink to="/crm">CRM</NavLink></li>
              <li>
                <button
                  className="summary-download-btn"
                  onClick={handleDownloadSummary}
                >
                  ⬇️ Summary
                </button>
              </li>
            </ul>
            <div className="user-profile">Sourabha Gokavi</div>
          </div>
        </nav>

        {/* Main content area */}
        <div className="content--netflix">
          <Routes>
            <Route path="/" element={<Navigate to="/recordings" replace />} />
            <Route
              path="/recordings"
              element={
                <>
                  <h2 className="section-title">Record & Upload</h2>
                  <UploadForm onUploadSuccess={setSelectedMedia} />
                  <h2 className="section-title" style={{ marginTop: '2rem' }}>Your Recordings</h2>
                  <MediaManager onEdit={setSelectedMedia} />
                </>
              }
            />
            <Route
              path="/transcripts"
              element={
                selectedMedia
                  ? <TranscriptEditor mediaId={selectedMedia} />
                  : <p className="empty-state">Select a recording first on “Recordings”</p>
              }
            />
            <Route path="/load-transcripts" element={<LoadTranscripts />} />
            <Route path="/insights" element={<RAGQuery />} />
            <Route
              path="/crm"
              element={
                selectedMedia
                  ? <CRMIntegration mediaId={selectedMedia} />
                  : <p className="empty-state">Select a recording first on “Recordings”</p>
              }
            />
            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
