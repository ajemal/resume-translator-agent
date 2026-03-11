import '../styles/PreviewPanel.css'

function PreviewPanel({ resume }) {
  const handleDownload = () => {
    // Placeholder for download logic
    alert('Download feature coming soon!')
  }

  return (
    <div className="preview-panel">
      <h2>Translated Resume Preview</h2>

      <div className="preview-content">
        <div className="preview-header">
          <h3>John Doe</h3>
          <p>john.doe@example.com | (123) 456-7890</p>
        </div>

        <div className="preview-section">
          <h4>Professional Summary</h4>
          <p>
            Results-driven professional with expertise in matching resume
            content to job requirements using AI-powered translation and
            optimization.
          </p>
        </div>

        <div className="preview-section">
          <h4>Experience</h4>
          <div className="experience-item">
            <h5>Senior Developer</h5>
            <p className="company">Tech Company Inc. | Jan 2020 - Present</p>
            <ul>
              <li>Led development of AI-powered translation system</li>
              <li>Improved resume matching accuracy by 45%</li>
              <li>Mentored junior developers on best practices</li>
            </ul>
          </div>
        </div>

        <div className="preview-section">
          <h4>Skills</h4>
          <div className="skills-grid">
            <span className="skill">React</span>
            <span className="skill">AI/ML</span>
            <span className="skill">Natural Language Processing</span>
            <span className="skill">Full Stack Development</span>
          </div>
        </div>
      </div>

      <div className="preview-actions">
        <button className="download-btn" onClick={handleDownload}>
          Download PDF
        </button>
        <button className="copy-btn">Copy to Clipboard</button>
      </div>
    </div>
  )
}

export default PreviewPanel
