# 🧠 DocNexus Frontend
DocNexus is an intelligent AI-powered platform to process HCP (Healthcare Professional) conversations. This frontend enables users to:

- Upload and manage audio recordings
- Automatically transcribe conversations using Whisper
- Edit transcripts and analyze sentiments
- Ask questions using RAG (Retrieval-Augmented Generation)
- Export key insights to a CRM (e.g., Google Sheets)


## 📦 Tech Stack

| Layer         | Tools Used                             |
|--------------|------------------------------------------|
| Frontend     | React (CRA), React Router, Swiper.js     |
| Transcription| OpenAI Whisper (backend)                 |
| Backend      | Flask REST API (localhost:5000)          |
| Storage      | File-based (local folder or cloud)       |
| Styling      | Custom CSS with Netflix-style theme      |

---

## 📁 Project Structure

docnexus-frontend/
├── src/
│ ├── components/ # UI Components
│ │ ├── UploadForm.jsx
│ │ ├── MediaManager.jsx
│ │ ├── TranscriptEditor.jsx
│ │ ├── CRMIntegration.jsx
│ │ └── RAGQuery.jsx
│ ├── styles/ # CSS files
│ ├── App.jsx # Main routing logic
│ └── index.js # Entry point
├── public/
├── README.md
└── package.json


✅ Features

🎙️ **Upload Media**  
  Upload `.mp3`, `.wav`, or other audio files.

📝 **Edit Transcript**  
  Automatically transcribed text using Whisper, with editing capability.

📊 **Sentiment Analysis**  
  Auto-generated sentiment breakdown (positive/neutral/negative).

🧠 **Ask Questions (RAG)**  
  Ask questions related to your conversation and get contextual answers.

📤 **CRM Export**  
  Push extracted metadata (HCP name, specialty, date) to a Google Sheet.

⚙️ Prerequisites

Ensure the following before running the app:

- Node.js >= 14
- npm >= 6
- [Backend Server](https://github.com/your-username/docnexus-backend) running on `http://localhost:5000`

🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/docnexus-frontend.git
cd docnexus-frontend

# Install dependencies
npm install
# Start the Front-end
npm start

