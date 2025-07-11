import React from 'react';
import UploadForm from './components/UploadForm';
import TranscriptViewer from './components/TranscriptViewer';
import TranscriptEditor from './components/TranscriptEditor';
import './App.css';

function App() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div>
          <h1>DocNexus AI Platform</h1>
          <p>AI-Powered Transcription and Insight Automation for HCP Meetings</p>
        </div>
        <img src="/logo.png" alt="DocNexus Map" />
      </div>

      {/* Step-by-step Sections */}
      <div className="container">
        <div className="card">
          <h2>Step 1: Upload Media + Metadata</h2>
          <UploadForm />
        </div>

        <div className="card">
          <h2>Step 2: View Transcript</h2>
          <TranscriptViewer />
        </div>

        <div className="card">
          <h2>Step 3: Edit & Update Transcript</h2>
          <TranscriptEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
