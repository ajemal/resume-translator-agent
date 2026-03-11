import { useState } from 'react'
import '../styles/TranslatorPanel.css'

function TranslatorPanel({ resume, onTranslate, isLoading }) {
  const [jobDescription, setJobDescription] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('english')
  const [tone, setTone] = useState('professional')

  const handleTranslate = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    const translationData = {
      resume,
      jobDescription,
      targetLanguage,
      tone,
    }

    onTranslate(translationData)
  }

  return (
    <div className="translator-panel">
      <h2>Translation Settings</h2>

      <div className="form-group">
        <label htmlFor="job-description">Job Description</label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description you want to tailor your resume to..."
          rows={6}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="target-language">Target Language</label>
          <select
            id="target-language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
            <option value="japanese">Japanese</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tone">Tone</label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="technical">Technical</option>
          </select>
        </div>
      </div>

      <button
        className="translate-btn"
        onClick={handleTranslate}
        disabled={isLoading}
      >
        {isLoading ? 'Translating...' : 'Translate Resume'}
      </button>
    </div>
  )
}

export default TranslatorPanel
