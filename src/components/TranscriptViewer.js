import React, { useState, useEffect } from 'react';

const TranscriptViewer = () => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading transcript data
    setLoading(true);
    setTimeout(() => {
      setTranscript(`
        [00:00:00] Speaker 1: Welcome to today's healthcare provider meeting.
        [00:00:15] Speaker 2: Thank you for having me. I'd like to discuss the new treatment protocols.
        [00:00:30] Speaker 1: Absolutely. Let's start with the patient care guidelines.
        [00:00:45] Speaker 2: The updated protocols show significant improvements in patient outcomes.
        [00:01:00] Speaker 1: That's excellent news. Can you provide more details on the implementation?
        [00:01:15] Speaker 2: Certainly. The key changes include enhanced monitoring procedures and revised medication schedules.
      `);
      setLoading(false);
    }, 1500);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    // Simulate API call to refresh transcript
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="transcript-viewer">
        <div className="loading">
          <p>Loading transcript...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transcript-viewer">
        <div className="error">
          <p>Error loading transcript: {error}</p>
          <button onClick={handleRefresh} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="transcript-viewer">
      <div className="transcript-header">
        <h3>Generated Transcript</h3>
        <button onClick={handleRefresh} className="refresh-btn">
          Refresh
        </button>
      </div>
      
      <div className="transcript-content">
        <pre className="transcript-text">
          {transcript || 'No transcript available. Please upload a media file first.'}
        </pre>
      </div>
      
      <div className="transcript-actions">
        <button className="download-btn">
          Download Transcript
        </button>
        <button className="share-btn">
          Share
        </button>
      </div>
    </div>
  );
};

export default TranscriptViewer;
