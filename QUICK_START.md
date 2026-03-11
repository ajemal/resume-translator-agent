# Quick Start Guide for Collaborators

## 📋 TL;DR - Get Running in 2 Minutes

```bash
# 1. Clone the repository
git clone <repository-url>
cd resume-translator-agent

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env

# 4. Start development
npm run dev
```

The app opens at `http://localhost:3000` 🎉

---

## 🛠️ Prerequisites

Before starting, make sure you have:
- ✅ Node.js v16+ ([Download here](https://nodejs.org/))
- ✅ npm v7+ (comes with Node.js)
- ✅ Git
- ✅ VS Code or preferred editor

Verify with:
```bash
node --version
npm --version
```

---

## 📁 What You'll Get

A fully functional React resume translator app with:
- **Resume Upload** - Drag & drop file support
- **Translation Panel** - Job description, language, and tone options
- **Live Preview** - Real-time resume preview
- **Professional UI** - Responsive design with gradients
- **API Integration** - Ready for backend connection
- **Hot Reload** - Instant updates during development

---

## 🚀 Commands You'll Use Most

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for code issues
npm run lint

# Auto-fix code issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm run test
```

---

## ⚙️ Environment Setup

Create `.env` file in root:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Resume Translator Agent
VITE_APP_VERSION=0.1.0
```

For AI services (optional):
```env
VITE_OPENAI_API_KEY=your_key
VITE_COHERE_API_KEY=your_key
```

---

## 📦 Project Structure

```
src/
├── components/         # React components
├── pages/             # Page components
├── services/          # API calls
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── styles/            # CSS files
├── types/             # TypeScript types
└── assets/            # Images, icons
```

---

## 🎨 Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| ResumeUploader | File upload | `src/components/ResumeUploader.jsx` |
| TranslatorPanel | Translation settings | `src/components/TranslatorPanel.jsx` |
| PreviewPanel | Resume preview | `src/components/PreviewPanel.jsx` |

---

## 🔗 Import Aliases

Use these for cleaner imports:

```jsx
// Instead of: ../../../components/Component
import Component from '@components/Component'

// Available:
// @components, @pages, @services, @hooks, @utils, @types, @styles, @assets
```

---

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| Port 3000 in use | Change port: `npm run dev -- --port 3001` |
| Module errors | Run: `npm install` |
| TypeScript errors | They disappear after `npm install` |

---

## 📚 Full Documentation

See `SETUP_GUIDE.md` for detailed setup and development guide.

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/YourFeature`
2. Make changes and commit: `git commit -m 'Add feature'`
3. Push: `git push origin feature/YourFeature`
4. Open Pull Request

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` troubleshooting section
2. Review code comments
3. Check React/Vite documentation
4. Open an issue in the repo

---

**You're all set! Happy coding! 🚀**
