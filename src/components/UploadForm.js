import React, { useState } from 'react';
import axios from 'axios';
import './UploadFors.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    hcpName: '',
    speciality: ''
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("Please select a file");
    return;
  }

  console.log(" File Selected:", file.name);
  console.log(" Metadata:", metadata);

  const formData = new FormData();
  formData.append('media', file);
  formData.append('metadata', JSON.stringify(metadata));

  console.log(" FormData contents:");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const res = await axios.post('http://localhost:5000/upload', formData);
    console.log(" Server Response:", res.data);
    alert(`Uploaded successfully! Media ID: ${res.data.media_id}`);
  } catch (err) {
    console.error(" Upload error:", err);
    alert("Upload failed");
  }
};


  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2>Step 1: Upload Media + Metadata</h2>

      <div className="form-group">
        <label htmlFor="media">Upload Media File</label>
        <input
          type="file"
          id="media"
          accept="audio/*,video/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="hcpName">HCP Name</label>
        <input
          type="text"
          id="hcpName"
          name="hcpName"
          value={metadata.hcpName}
          onChange={handleMetadataChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="speciality">Speciality</label>
        <input
          type="text"
          id="speciality"
          name="speciality"
          value={metadata.speciality}
          onChange={handleMetadataChange}
          required
        />
      </div>

      <button type="submit" className="btn-primary">Upload and Process</button>
    </form>
  );
};

export default UploadForm;
