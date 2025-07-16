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

export default function App() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <Router>
      <div className="app--netflix">

        {/* Navbar */}
        <nav className="navbar--netflix">
          <div className="logo">DocNexus AI</div>
          <ul className="nav-links">
            <li><NavLink to="/recordings">Recordings</NavLink></li>
            <li><NavLink to="/transcripts">Transcripts</NavLink></li>
            <li><NavLink to="/load-transcripts">Load</NavLink></li> {/* NEW */}
            {/* <li><NavLink to="/sentiment">Sentiment</NavLink></li> */}
            <li><NavLink to="/insights">Insights</NavLink></li>
            <li><NavLink to="/crm">CRM</NavLink></li>
          </ul>
        </nav>

        {/* Main content area */}
        <div className="content--netflix">
          <Routes>

            {/* Default → redirect to Recordings */}
            <Route path="/" element={<Navigate to="/recordings" replace />} />

            {/* Page: Upload & List Recordings */}
            <Route
              path="/recordings"
              element={
                <>
                  <h2 className="section-title">Record & Upload</h2>
                  <UploadForm onUploadSuccess={setSelectedMedia} />
                  <h2 className="section-title" style={{marginTop:'2rem'}}>Your Recordings</h2>
                  <MediaManager onEdit={setSelectedMedia} />
                </>
              }
            />

            {/* Page: Transcript Editor */}
            <Route
              path="/transcripts"
              element={
                selectedMedia 
                  ? <TranscriptEditor mediaId={selectedMedia} />
                  : <p className="empty-state">Select a recording first on “Recordings”</p>
              }
            />

            {/* Page: Load Transcripts (New) */}
            <Route
              path="/load-transcripts"
              element={<LoadTranscripts />}
            />

            {/* Page: Sentiment
            <Route
              path="/sentiment"
              element={
                selectedMedia 
                  ? <TranscriptEditor mediaId={selectedMedia} />
                  : <p className="empty-state">Select a recording first on “Recordings”</p>
              }
            /> */}

            {/* Page: Insights */}
            <Route path="/insights" element={<RAGQuery />} />

            {/* Page: CRM Integration */}
            <Route
              path="/crm"
              element={
                selectedMedia
                  ? <CRMIntegration mediaId={selectedMedia} />
                  : <p className="empty-state">Select a recording first on “Recordings”</p>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
