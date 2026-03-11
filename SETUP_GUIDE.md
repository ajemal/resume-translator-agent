# Resume Translator Agent - Setup & Installation Guide

## Project Overview

This is an **AI-powered React-based resume translator agent** that intelligently translates and optimizes resumes to match specific job descriptions.

### Key Features
- 📄 Resume Upload (PDF, DOCX, DOC, TXT)
- 🎯 AI-powered job matching and optimization
- 🌍 Multi-language translation support
- 🎨 Real-time preview panel
- 📊 Keyword matching and scoring
- ✨ Multiple tone options (Professional, Casual, Formal, Technical)

---

## Project Structure

```
resume-translator-agent/
├── src/
│   ├── components/
│   │   ├── ResumeUploader.jsx      # File upload with drag-and-drop
│   │   ├── TranslatorPanel.jsx     # Translation settings panel
│   │   └── PreviewPanel.jsx        # Resume preview display
│   ├── pages/                      # Page-level components (for future use)
│   ├── services/
│   │   └── api.js                  # Axios API client with interceptors
│   ├── hooks/
│   │   └── useResume.js            # Custom hook for resume operations
│   ├── context/                    # React Context (for future use)
│   ├── utils/
│   │   └── fileParser.js           # File validation and parsing
│   ├── types/
│   │   └── resume.ts               # TypeScript type definitions
│   ├── styles/
│   │   ├── index.css               # Global styles
│   │   ├── App.css                 # App layout
│   │   ├── ResumeUploader.css      # Uploader component
│   │   ├── TranslatorPanel.css     # Translator panel
│   │   └── PreviewPanel.css        # Preview panel
│   ├── assets/                     # Images, icons, fonts
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # React entry point
├── public/
│   └── index.html                  # HTML entry point
├── tests/                          # Test files (for future use)
├── docs/                           # Documentation (for future use)
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── vitest.config.ts                # Testing configuration
├── .eslintrc.cjs                   # ESLint rules
├── .prettierrc                      # Code formatting rules
├── .gitignore                       # Git ignore patterns
├── .env.example                     # Environment variables template
└── README.md                        # Project documentation
```

---

## Installation & Setup Guide

### Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher
- **Git** (to clone the repository)
- **VS Code** or any code editor

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd resume-translator-agent
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- **React** 18.2.0
- **Vite** 5.0.0 (build tool)
- **Axios** 1.6.0 (HTTP client)
- **Zustand** 4.4.0 (state management - optional)
- **Vitest** 1.0.0 (testing)
- **ESLint & Prettier** (code quality)

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and configure your API endpoint:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Resume Translator Agent
VITE_APP_VERSION=0.1.0
```

**Optional:** If using external AI services:
```env
VITE_OPENAI_API_KEY=your_key_here
VITE_COHERE_API_KEY=your_key_here
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will open at **`http://localhost:3000`** with hot-reload enabled.

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Format code with Prettier
npm run format
```

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 5.0.0 | Build Tool & Dev Server |
| TypeScript | Latest | Type Safety |
| Axios | 1.6.0 | HTTP Client |
| Zustand | 4.4.0 | State Management |
| Vitest | 1.0.0 | Unit Testing |
| ESLint | 8.54.0 | Code Linting |
| Prettier | 3.1.0 | Code Formatting |

---

## Project Features

### 1. Resume Upload Component
- Drag-and-drop support
- File format validation (PDF, DOCX, DOC, TXT)
- File size limit (10MB)
- Visual feedback on drag state

### 2. Translator Panel
- Job description textarea
- Language selection (English, Spanish, French, German, Chinese, Japanese)
- Tone selection (Professional, Casual, Formal, Technical)
- Translate button with loading state

### 3. Preview Panel
- Real-time resume preview
- Professional formatting
- Skills display with tags
- Download PDF button
- Copy to clipboard functionality

### 4. API Integration
- Axios HTTP client with interceptors
- Authentication token handling
- Error handling and logging
- Base URL configuration via environment variables

### 5. Custom Hooks
- `useResume()` - Manage resume upload, parsing, and translation

### 6. Utility Functions
- File validation
- File size formatting
- Resume parsing for different formats

---

## API Endpoints (Expected Backend)

The app expects a backend API at `VITE_API_URL` with the following endpoints:

### Resume Endpoints
```
POST /api/resume/upload
POST /api/resume/parse
POST /api/resume/translate
POST /api/resume/match
```

### Job Description Endpoints
```
POST /api/jobs/analyze
POST /api/jobs/keywords
```

See `src/services/api.js` for implementation details.

---

## Development Workflow

### 1. Creating New Components

Place components in `src/components/`:

```jsx
// src/components/YourComponent.jsx
import '../styles/YourComponent.css'

function YourComponent() {
  return (
    <div className="your-component">
      {/* Component content */}
    </div>
  )
}

export default YourComponent
```

### 2. Adding Styles

Create corresponding CSS file in `src/styles/`:

```css
/* src/styles/YourComponent.css */
.your-component {
  /* Your styles */
}
```

### 3. Using Custom Hooks

```jsx
import { useResume } from '@hooks/useResume'

function MyComponent() {
  const { resume, uploadResume, isLoading } = useResume()
  
  return (/* Component JSX */)
}
```

### 4. Using Path Aliases

The project has configured path aliases for cleaner imports:

```jsx
// Instead of: import Component from '../../../components/Component'
// Use:
import Component from '@components/Component'

// Available aliases:
// @/ - src root
// @components - src/components
// @pages - src/pages
// @services - src/services
// @hooks - src/hooks
// @context - src/context
// @utils - src/utils
// @types - src/types
// @styles - src/styles
// @assets - src/assets
```

---

## Environment Setup

### For macOS/Linux:

```bash
# Install Node.js and npm (using Homebrew)
brew install node

# Verify installation
node --version
npm --version

# Navigate to project and install
cd resume-translator-agent
npm install
npm run dev
```

### For Windows:

1. Download Node.js from https://nodejs.org/
2. Run the installer and follow prompts
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```
4. Clone the repo and run:
   ```bash
   git clone <repository-url>
   cd resume-translator-agent
   npm install
   npm run dev
   ```

### For WSL (Windows Subsystem for Linux):

```bash
# Update package manager
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version

# Clone and setup
git clone <repository-url>
cd resume-translator-agent
npm install
npm run dev
```

---

## Troubleshooting

### Issue: `npm: command not found`
**Solution:** Node.js/npm is not installed. Follow the environment setup steps above.

### Issue: Port 3000 already in use
**Solution:** The dev server will automatically use the next available port, or you can specify a different port:
```bash
npm run dev -- --port 3001
```

### Issue: Module not found errors
**Solution:** Make sure all dependencies are installed:
```bash
rm -rf node_modules
npm install
```

### Issue: TypeScript errors in vite.config.ts
**Solution:** These are normal before installing dependencies. They'll resolve after `npm install`.

### Issue: Out of memory during build
**Solution:** Increase Node.js memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

## Next Steps for Development

1. **Backend API Setup**
   - Create a backend server (Node.js/Express, Python/Flask, etc.)
   - Implement the API endpoints listed above
   - Set `VITE_API_URL` in `.env`

2. **AI Integration**
   - Integrate OpenAI API, Cohere, or your preferred AI service
   - Add API keys to `.env`
   - Implement resume analysis and translation logic

3. **Database Setup**
   - Add database for storing resume history
   - Create user authentication system

4. **Additional Features**
   - User authentication
   - Resume history/versions
   - Advanced analytics
   - Export to multiple formats
   - Multiple resume templates

5. **Testing**
   - Write unit tests for components
   - Add integration tests
   - Test API calls

---

## Contributing Guidelines

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Make your changes and commit: `git commit -m 'Add YourFeature'`
3. Push to branch: `git push origin feature/YourFeature`
4. Open a Pull Request

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vitest Documentation](https://vitest.dev)

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments in each file
3. Check the main README.md
4. Open an issue in the repository

---

## License

This project is licensed under the MIT License.

---

**Happy coding! 🚀**
