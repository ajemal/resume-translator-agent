import { useState, useEffect, useRef } from "react";

const ACCENT = "#00C9A7";
const DARK = "#0A0F1E";
const CARD = "#111827";
const BORDER = "#1E2D40";
const MUTED = "#4B6280";
const TEXT = "#E2EAF4";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${DARK};
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .mono { font-family: 'Space Mono', monospace; }

  .app {
    min-height: 100vh;
    background: ${DARK};
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,201,167,0.08) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(30,45,64,0.4) 39px, rgba(30,45,64,0.4) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(30,45,64,0.4) 39px, rgba(30,45,64,0.4) 40px);
    padding: 0 0 80px;
  }

  /* ── HEADER ───────────────────────────────────────── */
  .header {
    border-bottom: 1px solid ${BORDER};
    background: rgba(10,15,30,0.9);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 0 40px;
  }
  .header-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .logo-icon {
    width: 34px; height: 34px;
    border: 1.5px solid ${ACCENT};
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: ${ACCENT};
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -1px;
  }
  .logo-name {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.08em;
    color: ${TEXT};
    text-transform: uppercase;
  }
  .logo-name span { color: ${ACCENT}; }
  .header-badge {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: ${ACCENT};
    border: 1px solid ${ACCENT}33;
    background: ${ACCENT}11;
    padding: 4px 10px;
    border-radius: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── HERO ─────────────────────────────────────────── */
  .hero {
    max-width: 1100px;
    margin: 0 auto;
    padding: 72px 40px 48px;
  }
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: ${ACCENT};
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 20px;
  }
  .hero-tag::before {
    content: '';
    width: 24px; height: 1px;
    background: ${ACCENT};
  }
  .hero-title {
    font-family: 'Space Mono', monospace;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    line-height: 1.15;
    color: ${TEXT};
    margin-bottom: 16px;
  }
  .hero-title .accent { color: ${ACCENT}; }
  .hero-sub {
    font-size: 16px;
    color: ${MUTED};
    max-width: 560px;
    line-height: 1.7;
    font-weight: 300;
  }

  /* ── AGENT PIPELINE ───────────────────────────────── */
  .pipeline {
    max-width: 1100px;
    margin: 0 auto 48px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 0;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .agent-node {
    display: flex;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
  }
  .agent-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid ${BORDER};
    background: ${CARD};
    font-size: 12px;
    font-family: 'Space Mono', monospace;
    color: ${MUTED};
    transition: all 0.2s;
    white-space: nowrap;
  }
  .agent-pill.active {
    border-color: ${ACCENT};
    color: ${ACCENT};
    background: ${ACCENT}15;
    box-shadow: 0 0 16px ${ACCENT}20;
  }
  .agent-pill.done {
    border-color: ${ACCENT}55;
    color: ${ACCENT}88;
    background: ${ACCENT}08;
  }
  .agent-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
  .pipe-arrow {
    width: 28px; height: 1px;
    background: linear-gradient(90deg, ${BORDER}, ${BORDER});
    position: relative;
    flex-shrink: 0;
  }
  .pipe-arrow::after {
    content: '›';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    color: ${BORDER};
    font-size: 14px;
    line-height: 1;
  }
  .pipe-arrow.active {
    background: linear-gradient(90deg, ${ACCENT}44, ${ACCENT}88);
  }
  .pipe-arrow.active::after { color: ${ACCENT}88; }

  /* ── MAIN LAYOUT ──────────────────────────────────── */
  .main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr; padding: 0 20px; }
    .pipeline { padding: 0 20px; }
    .hero { padding: 48px 20px 32px; }
  }

  /* ── CARDS ─────────────────────────────────────────── */
  .card {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 16px;
    overflow: hidden;
  }
  .card-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid ${BORDER};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${MUTED};
    margin-bottom: 4px;
  }
  .card-title {
    font-size: 15px;
    font-weight: 600;
    color: ${TEXT};
  }
  .card-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: ${ACCENT}15;
    border: 1px solid ${ACCENT}33;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .card-body { padding: 24px; }

  /* ── FORM ELEMENTS ─────────────────────────────────── */
  label {
    display: block;
    font-size: 12px;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${MUTED};
    margin-bottom: 8px;
  }
  textarea, .file-drop {
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid ${BORDER};
    border-radius: 10px;
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    padding: 14px 16px;
    resize: vertical;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  textarea:focus {
    border-color: ${ACCENT}66;
    box-shadow: 0 0 0 3px ${ACCENT}15;
  }
  textarea::placeholder { color: ${MUTED}88; }

  .file-drop {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 8px;
    text-align: center;
    transition: all 0.2s;
  }
  .file-drop:hover, .file-drop.drag-over {
    border-color: ${ACCENT}66;
    background: ${ACCENT}08;
  }
  .file-drop-icon { font-size: 24px; }
  .file-drop-text { font-size: 13px; color: ${MUTED}; }
  .file-drop-text span { color: ${ACCENT}; }
  .file-drop.has-file { border-color: ${ACCENT}55; background: ${ACCENT}08; }
  .file-name {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: ${ACCENT};
  }

  .field-group { margin-bottom: 20px; }
  .field-group:last-child { margin-bottom: 0; }

  /* ── BUTTON ─────────────────────────────────────────── */
  .btn-run {
    width: 100%;
    padding: 16px;
    background: ${ACCENT};
    color: ${DARK};
    border: none;
    border-radius: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 24px;
  }
  .btn-run:hover:not(:disabled) {
    background: #00e0bb;
    box-shadow: 0 0 24px ${ACCENT}44;
    transform: translateY(-1px);
  }
  .btn-run:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
  .btn-run .spinner {
    width: 16px; height: 16px;
    border: 2px solid ${DARK}44;
    border-top-color: ${DARK};
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── OUTPUT PANEL ─────────────────────────────────── */
  .output-card {
    grid-column: 1 / -1;
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 16px;
    overflow: hidden;
    animation: slideUp 0.4s ease;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .output-tabs {
    display: flex;
    border-bottom: 1px solid ${BORDER};
    background: rgba(0,0,0,0.2);
  }
  .tab-btn {
    padding: 14px 24px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${MUTED};
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .tab-btn:hover { color: ${TEXT}; }
  .tab-btn.active {
    color: ${ACCENT};
    border-bottom-color: ${ACCENT};
  }
  .tab-badge {
    background: ${ACCENT}22;
    color: ${ACCENT};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 9px;
  }

  .tab-content { padding: 28px; }

  /* ── TRANSLATED RESUME ───────────────────────────── */
  .resume-output {
    background: rgba(0,0,0,0.25);
    border: 1px solid ${BORDER};
    border-radius: 10px;
    padding: 24px;
    font-size: 14px;
    line-height: 1.8;
    color: ${TEXT};
    white-space: pre-wrap;
    font-family: 'DM Sans', sans-serif;
    position: relative;
  }
  .resume-section-head {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${ACCENT};
    margin-bottom: 8px;
    margin-top: 20px;
  }
  .resume-section-head:first-child { margin-top: 0; }

  /* ── GAP CARDS ───────────────────────────────────── */
  .gaps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  .gap-card {
    background: rgba(0,0,0,0.25);
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 18px;
    animation: fadeIn 0.3s ease both;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .gap-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 12px;
  }
  .gap-skill {
    font-size: 14px;
    font-weight: 600;
    color: ${TEXT};
    line-height: 1.3;
  }
  .gap-priority {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  .priority-high { background: #FF4D4D22; color: #FF6B6B; border: 1px solid #FF4D4D33; }
  .priority-medium { background: #FFB44422; color: #FFB444; border: 1px solid #FFB44433; }
  .priority-low { background: ${ACCENT}22; color: ${ACCENT}; border: 1px solid ${ACCENT}33; }
  .gap-desc {
    font-size: 13px;
    color: ${MUTED};
    line-height: 1.6;
    margin-bottom: 12px;
  }
  .gap-action {
    font-size: 12px;
    color: ${ACCENT};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .gap-action::before { content: '→'; }

  /* ── STATS BAR ───────────────────────────────────── */
  .stats-bar {
    display: flex;
    gap: 24px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .stat-value {
    font-family: 'Space Mono', monospace;
    font-size: 26px;
    font-weight: 700;
    color: ${ACCENT};
  }
  .stat-label {
    font-size: 12px;
    color: ${MUTED};
  }

  /* ── COPY BTN ────────────────────────────────────── */
  .copy-btn {
    position: absolute;
    top: 12px; right: 12px;
    background: ${BORDER};
    border: 1px solid ${BORDER};
    color: ${MUTED};
    border-radius: 6px;
    padding: 6px 12px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .copy-btn:hover { color: ${TEXT}; border-color: ${TEXT}33; }
  .copy-btn.copied { color: ${ACCENT}; border-color: ${ACCENT}44; }

  /* ── AUDIT TRAIL ─────────────────────────────────── */
  .audit-log {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    line-height: 2;
    color: ${MUTED};
  }
  .audit-log .log-line { display: flex; gap: 16px; }
  .log-time { color: ${ACCENT}66; flex-shrink: 0; }
  .log-agent { color: ${ACCENT}; flex-shrink: 0; min-width: 120px; }
  .log-msg { color: ${MUTED}; }
  .log-ok { color: #00C9A7; }

  /* ── THINKING ────────────────────────────────────── */
  .thinking {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 32px;
    color: ${MUTED};
    font-family: 'Space Mono', monospace;
    font-size: 13px;
  }
  .thinking-dots span {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${ACCENT};
    margin: 0 2px;
    animation: pulse 1.4s ease-in-out infinite;
  }
  .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
  .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse {
    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }

  /* ── DIVIDER ─────────────────────────────────────── */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, ${BORDER}, transparent);
    margin: 28px 0;
  }

  /* ── SCROLLBAR ───────────────────────────────────── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }

  .empty-state {
    text-align: center;
    padding: 60px 40px;
    color: ${MUTED};
  }
  .empty-state-icon { font-size: 40px; margin-bottom: 16px; opacity: 0.4; }
  .empty-state-text { font-size: 14px; line-height: 1.6; }
`;

// ── SYSTEM PROMPTS ─────────────────────────────────────────────────────────────

const TRANSLATOR_PROMPT = (resume, jobDesc) => `You are the Translator Agent in the GAN-Driven Educational Workforce Sandbox. Your domain is Healthcare Informatics.

A student has submitted their resume and a target job description. Your job is to:
1. Rewrite the resume in the professional language of the target job, preserving all real experience but reframing it in clinical/health IT terminology. Do not fabricate experience.
2. Identify specific capability gaps — skills, tools, or competencies required by the job that are not demonstrated in the resume.

Respond ONLY with a valid JSON object, no markdown, no preamble:
{
  "translatedResume": {
    "summary": "A 2-3 sentence professional summary in healthcare IT language",
    "experience": ["bullet 1", "bullet 2", "bullet 3", "...up to 6 bullets rewriting their experience"],
    "education": ["education bullet reframed professionally"],
    "skills": ["skill 1", "skill 2", "...extracted and normalized technical skills"]
  },
  "gaps": [
    {
      "skill": "Skill name",
      "priority": "High|Medium|Low",
      "description": "Why this gap matters for the role",
      "recommendation": "Specific action to close this gap"
    }
  ],
  "matchScore": 42,
  "auditLog": [
    { "time": "00:00:01", "agent": "Translator", "message": "Resume parsed. 3 experience entries detected.", "status": "ok" },
    { "time": "00:00:02", "agent": "Translator", "message": "Terminology mapping: Academic → Clinical", "status": "ok" },
    { "time": "00:00:03", "agent": "Audit", "message": "No fabricated credentials detected. Translation is faithful.", "status": "ok" },
    { "time": "00:00:04", "agent": "Translator", "message": "Gap analysis complete. N gaps identified.", "status": "ok" },
    { "time": "00:00:05", "agent": "Audit", "message": "Output verified. Ready for Advising Agent.", "status": "ok" }
  ]
}

STUDENT RESUME:
${resume}

TARGET JOB DESCRIPTION:
${jobDesc}`;

// ── SAMPLE DATA ────────────────────────────────────────────────────────────────

const SAMPLE_RESUME = `Maya Osei
Health Informatics, B.S. — Kennesaw State University, 2025
GPA: 3.7

Experience:
- Internship at Northside Hospital (Summer 2024): Shadowed IT team, helped document EHR workflows. Attended 12 Go-Live training sessions for Epic upgrade.
- Class Project (HINF 3300): Analyzed a CSV dataset of 2,000 patient records using Excel and Python pandas. Created charts showing readmission trends.
- Volunteer, KSU Health IT Club: Helped organize a HIPAA awareness workshop for undergrad students.

Skills: Microsoft Excel, Python (basic), SQL (intro course), HIPAA awareness, Epic (observed), PowerPoint

Education:
B.S. Health Informatics, Kennesaw State University, May 2025
Relevant coursework: Healthcare Data Management, Clinical Systems Analysis, Health Privacy Law, Database Fundamentals`;

const SAMPLE_JOB = `Clinical Data Analyst — Emory Healthcare
Atlanta, GA | Full-time

Responsibilities:
- Query and analyze EHR data (Epic) to support clinical quality improvement initiatives
- Build and maintain dashboards (Tableau/Power BI) tracking patient flow, readmissions, and care gaps
- Develop SQL queries against large clinical databases; optimize for performance
- Support FHIR-based API integrations between clinical systems
- Ensure data governance compliance (HIPAA, HITECH); maintain audit trails
- Collaborate with clinical leadership to translate data insights into operational decisions

Requirements:
- 1-2 years experience in health data analytics or equivalent project experience
- Proficiency in SQL, Python or R, and BI tools (Tableau or Power BI)
- Familiarity with HL7, FHIR, and clinical data standards
- Experience with Epic or equivalent EHR platform
- Knowledge of HIPAA Privacy Rule and healthcare data governance
- Strong communication skills; ability to present findings to clinical stakeholders`;

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

export default function SandboxMVP() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("resume");
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [activeAgent, setActiveAgent] = useState(null);
  const fileRef = useRef();

  const agents = [
    { id: "translator", label: "Translator" },
    { id: "talent", label: "Talent" },
    { id: "curriculum", label: "Curriculum" },
    { id: "advising", label: "Advising" },
    { id: "audit", label: "Audit" },
  ];

  const canRun = resume.trim().length > 20 && jobDesc.trim().length > 20;

  function loadSamples() {
    setResume(SAMPLE_RESUME);
    setJobDesc(SAMPLE_JOB);
    setFileName("Maya_Osei_Resume.txt");
  }

  function handleFile(file) {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setResume(e.target.result);
    reader.readAsText(file);
  }

  async function runTranslator() {
    if (!canRun) return;
    setLoading(true);
    setResult(null);
    setActiveAgent("translator");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: TRANSLATOR_PROMPT(resume, jobDesc) }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setActiveTab("resume");
      setActiveAgent("audit");
    } catch (err) {
      setResult({ error: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  function copyResume() {
    if (!result?.translatedResume) return;
    const tr = result.translatedResume;
    const text = [
      "PROFESSIONAL SUMMARY",
      tr.summary, "",
      "EXPERIENCE",
      ...(tr.experience || []).map(e => "• " + e), "",
      "EDUCATION",
      ...(tr.education || []).map(e => "• " + e), "",
      "SKILLS",
      (tr.skills || []).join(", ")
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const matchScore = result?.matchScore || 0;
  const gapCount = result?.gaps?.length || 0;

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {/* HEADER */}
        <header className="header">
          <div className="header-inner">
            <div className="logo">
              <div className="logo-icon">SB</div>
              <div className="logo-name">Workforce <span>Sandbox</span></div>
            </div>
            <div className="header-badge">MVP · Healthcare Informatics</div>
          </div>
        </header>

        {/* HERO */}
        <div className="hero">
          <div className="hero-tag">Translator Agent · Active</div>
          <h1 className="hero-title">
            From Graduate<br />to <span className="accent">Clinical Ready</span>
          </h1>
          <p className="hero-sub">
            Upload your resume and paste a job description. The Translator Agent rewrites your experience in clinical language and maps the gap between where you are and where the role requires you to be.
          </p>
        </div>

        {/* AGENT PIPELINE */}
        <div className="pipeline">
          {agents.map((a, i) => (
            <div className="agent-node" key={a.id}>
              <div className={`agent-pill ${activeAgent === a.id ? "active" : result && a.id === "audit" ? "done" : result && a.id === "translator" ? "done" : ""}`}>
                <div className="agent-dot" />
                {a.label}
              </div>
              {i < agents.length - 1 && (
                <div className={`pipe-arrow ${activeAgent ? "active" : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="main">

          {/* INPUT: RESUME */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-label">Input 01</div>
                <div className="card-title">Student Resume</div>
              </div>
              <div className="card-icon">📄</div>
            </div>
            <div className="card-body">
              <div className="field-group">
                <label>Upload or paste resume</label>
                <div
                  className={`file-drop ${dragOver ? "drag-over" : ""} ${fileName ? "has-file" : ""}`}
                  onClick={() => fileRef.current.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                >
                  <input ref={fileRef} type="file" accept=".txt,.pdf,.doc,.docx" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                  {fileName ? (
                    <>
                      <div className="file-drop-icon">✓</div>
                      <div className="file-name">{fileName}</div>
                    </>
                  ) : (
                    <>
                      <div className="file-drop-icon">⬆</div>
                      <div className="file-drop-text">Drop file or <span>click to upload</span></div>
                      <div className="file-drop-text" style={{ fontSize: "11px" }}>.txt, .pdf, .docx</div>
                    </>
                  )}
                </div>
              </div>
              <div className="field-group">
                <label>Or paste resume text</label>
                <textarea
                  rows={10}
                  placeholder="Paste resume content here..."
                  value={resume}
                  onChange={e => setResume(e.target.value)}
                />
              </div>
              <button
                style={{ marginTop: 8, background: "none", border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 8, padding: "8px 16px", fontSize: 12, fontFamily: "'Space Mono', monospace", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}
                onClick={loadSamples}
              >
                Load Maya's Sample Data →
              </button>
            </div>
          </div>

          {/* INPUT: JOB */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-label">Input 02</div>
                <div className="card-title">Target Job Description</div>
              </div>
              <div className="card-icon">🏥</div>
            </div>
            <div className="card-body">
              <div className="field-group">
                <label>Paste job posting</label>
                <textarea
                  rows={16}
                  placeholder="Paste the full job description here..."
                  value={jobDesc}
                  onChange={e => setJobDesc(e.target.value)}
                />
              </div>
              <button
                className="btn-run"
                disabled={!canRun || loading}
                onClick={runTranslator}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Translator Agent Running...
                  </>
                ) : (
                  "Run Translator Agent →"
                )}
              </button>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="output-card">
              <div className="thinking">
                <div className="thinking-dots">
                  <span /><span /><span />
                </div>
                <span>Translator Agent is analyzing resume and mapping terminology...</span>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {result && !loading && (
            <div className="output-card">
              {result.error ? (
                <div style={{ padding: 32, color: "#FF6B6B", fontFamily: "'Space Mono', monospace", fontSize: 13 }}>
                  ⚠ {result.error}
                </div>
              ) : (
                <>
                  {/* TABS */}
                  <div className="output-tabs">
                    <button className={`tab-btn ${activeTab === "resume" ? "active" : ""}`} onClick={() => setActiveTab("resume")}>
                      Translated Resume
                    </button>
                    <button className={`tab-btn ${activeTab === "gaps" ? "active" : ""}`} onClick={() => setActiveTab("gaps")}>
                      Capability Gaps
                      <span className="tab-badge">{gapCount}</span>
                    </button>
                    <button className={`tab-btn ${activeTab === "audit" ? "active" : ""}`} onClick={() => setActiveTab("audit")}>
                      Audit Log
                    </button>
                  </div>

                  <div className="tab-content">

                    {/* STATS */}
                    <div className="stats-bar">
                      <div className="stat">
                        <div className="stat-value">{matchScore}%</div>
                        <div className="stat-label">Match Score</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">{gapCount}</div>
                        <div className="stat-label">Gaps Identified</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">{result.gaps?.filter(g => g.priority === "High").length || 0}</div>
                        <div className="stat-label">High Priority</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value" style={{ fontSize: 18 }}>Translator ✓</div>
                        <div className="stat-label">Agent Status</div>
                      </div>
                    </div>

                    <div className="section-divider" />

                    {/* TRANSLATED RESUME TAB */}
                    {activeTab === "resume" && result.translatedResume && (
                      <div style={{ position: "relative" }}>
                        <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyResume}>
                          {copied ? "Copied ✓" : "Copy"}
                        </button>
                        <div className="resume-output">
                          <div className="resume-section-head">Professional Summary</div>
                          <p style={{ marginBottom: 20 }}>{result.translatedResume.summary}</p>

                          <div className="resume-section-head">Experience</div>
                          {(result.translatedResume.experience || []).map((e, i) => (
                            <p key={i} style={{ marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                              <span style={{ position: "absolute", left: 0, color: ACCENT }}>▸</span>
                              {e}
                            </p>
                          ))}

                          <div className="resume-section-head" style={{ marginTop: 20 }}>Education</div>
                          {(result.translatedResume.education || []).map((e, i) => (
                            <p key={i} style={{ marginBottom: 6 }}>{e}</p>
                          ))}

                          <div className="resume-section-head" style={{ marginTop: 20 }}>Technical Skills</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                            {(result.translatedResume.skills || []).map((s, i) => (
                              <span key={i} style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}33`, color: ACCENT, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* GAPS TAB */}
                    {activeTab === "gaps" && (
                      <div className="gaps-grid">
                        {(result.gaps || []).map((gap, i) => (
                          <div key={i} className="gap-card" style={{ animationDelay: `${i * 0.06}s` }}>
                            <div className="gap-card-top">
                              <div className="gap-skill">{gap.skill}</div>
                              <div className={`gap-priority priority-${gap.priority?.toLowerCase()}`}>
                                {gap.priority}
                              </div>
                            </div>
                            <div className="gap-desc">{gap.description}</div>
                            <div className="gap-action">{gap.recommendation}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* AUDIT TAB */}
                    {activeTab === "audit" && (
                      <div className="audit-log">
                        {(result.auditLog || []).map((entry, i) => (
                          <div key={i} className="log-line">
                            <span className="log-time">[{entry.time}]</span>
                            <span className="log-agent">{entry.agent}</span>
                            <span className={`log-msg ${entry.status === "ok" ? "log-ok" : ""}`}>
                              {entry.status === "ok" ? "✓ " : "⚠ "}{entry.message}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </>
              )}
            </div>
          )}

          {/* EMPTY STATE */}
          {!result && !loading && (
            <div className="output-card" style={{ background: "transparent", border: `1px dashed ${BORDER}` }}>
              <div className="empty-state">
                <div className="empty-state-icon">⬡</div>
                <div className="empty-state-text mono" style={{ fontSize: 12, color: MUTED }}>
                  Translator Agent standing by.<br />
                  Submit resume + job description to activate.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
