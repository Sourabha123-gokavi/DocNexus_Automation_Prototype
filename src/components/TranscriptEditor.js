import React, { useState } from 'react';

const TranscriptEditor = () => {
  const [editableTranscript, setEditableTranscript] = useState(`
[00:00:00] Speaker 1: Welcome to today's healthcare provider meeting.
[00:00:15] Speaker 2: Thank you for having me. I'd like to discuss the new treatment protocols.
[00:00:30] Speaker 1: Absolutely. Let's start with the patient care guidelines.
[00:00:45] Speaker 2: The updated protocols show significant improvements in patient outcomes.
[00:01:00] Speaker 1: That's excellent news. Can you provide more details on the implementation?
[00:01:15] Speaker 2: Certainly. The key changes include enhanced monitoring procedures and revised medication schedules.
  `);
  
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleTextChange = (e) => {
    setEditableTranscript(e.target.value);
    setHasChanges(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Simulate saving changes
    console.log('Saving transcript changes...');
    setIsEditing(false);
    setHasChanges(false);
    // Here you would typically send the updated transcript to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original content if needed
    setHasChanges(false);
  };

  const handleExport = () => {
    // Create a downloadable file
    const element = document.createElement('a');
    const file = new Blob([editableTranscript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'edited_transcript.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="transcript-editor">
      <div className="editor-header">
        <h3>Edit Transcript</h3>
        <div className="editor-actions">
          {!isEditing ? (
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="save-btn" disabled={!hasChanges}>
                Save Changes
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </>
          )}
          <button onClick={handleExport} className="export-btn">
            Export
          </button>
        </div>
      </div>

      <div className="editor-content">
        {isEditing ? (
          <textarea
            value={editableTranscript}
            onChange={handleTextChange}
            className="transcript-textarea"
            rows="15"
            placeholder="Edit your transcript here..."
          />
        ) : (
          <pre className="transcript-display">
            {editableTranscript}
          </pre>
        )}
      </div>

      {hasChanges && (
        <div className="changes-indicator">
          <p>⚠️ You have unsaved changes</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptEditor;
