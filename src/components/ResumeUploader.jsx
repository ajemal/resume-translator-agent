import { useState } from 'react'
import '../styles/ResumeUploader.css'

function ResumeUploader({ onUpload, resume }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onUpload(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      onUpload(files[0])
    }
  }

  return (
    <div className="resume-uploader">
      <h2>Upload Resume</h2>
      {!resume ? (
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag and drop your resume here</p>
          <p>or</p>
          <label htmlFor="file-input" className="file-input-label">
            Browse Files
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="file-preview">
          <p className="file-name">{resume.name}</p>
          <p className="file-size">{(resume.size / 1024).toFixed(2)} KB</p>
          <button
            className="change-file-btn"
            onClick={() => document.getElementById('file-input2').click()}
          >
            Change File
          </button>
          <input
            id="file-input2"
            type="file"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  )
}

export default ResumeUploader
