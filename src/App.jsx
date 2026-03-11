import { useState } from 'react'
import './styles/App.css'
import ResumeUploader from '@components/ResumeUploader'
import TranslatorPanel from '@components/TranslatorPanel'
import PreviewPanel from '@components/PreviewPanel'

function App() {
  const [resume, setResume] = useState(null)
  const [translatedResume, setTranslatedResume] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleResumeUpload = (file) => {
    setResume(file)
    setTranslatedResume(null)
  }

  const handleTranslate = (translatedData) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTranslatedResume(translatedData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Resume Translator Agent</h1>
        <p>Translate and optimize your resume for any job description</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="left-panel">
            <ResumeUploader onUpload={handleResumeUpload} resume={resume} />
            {resume && (
              <TranslatorPanel
                resume={resume}
                onTranslate={handleTranslate}
                isLoading={isLoading}
              />
            )}
          </div>

          <div className="right-panel">
            {translatedResume && <PreviewPanel resume={translatedResume} />}
            {!translatedResume && !resume && (
              <div className="placeholder">
                <p>Upload a resume to get started</p>
              </div>
            )}
            {!translatedResume && resume && (
              <div className="placeholder">
                <p>Configure translation options and click "Translate"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
