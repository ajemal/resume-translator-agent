# Resume Translator Agent

An AI-powered React-based application that intelligently translates and optimizes resumes to match specific job descriptions.

## Features

- 📄 **Resume Upload**: Support for PDF, DOCX, DOC, and TXT formats
- 🎯 **Job Matching**: AI-powered resume optimization for specific job descriptions
- 🌍 **Multi-language Support**: Translate resumes to multiple languages
- 🎨 **Real-time Preview**: See changes as you configure translations
- 📊 **Keyword Matching**: Identifies and highlights relevant keywords
- ✨ **Professional Tone Options**: Choose between professional, casual, formal, or technical styles

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ResumeUploader.jsx
│   ├── TranslatorPanel.jsx
│   └── PreviewPanel.jsx
├── pages/              # Page-level components
├── services/           # API and external service integrations
├── hooks/              # Custom React hooks
├── context/            # React Context for state management
├── utils/              # Utility functions
├── styles/             # CSS stylesheets
├── assets/             # Images, icons, fonts
├── types/              # TypeScript type definitions
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Configure your API endpoint in `.env`:

```
VITE_API_URL=http://localhost:3001/api
```

### Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting errors
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run format` - Format code with Prettier

## Technologies Used

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite
- **Styling**: CSS3
- **HTTP Client**: Axios
- **State Management**: Zustand (optional)
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier
- **TypeScript**: Type definitions included

## API Integration

The app communicates with a backend API for:

- Resume parsing and extraction
- AI-powered translation and optimization
- Job description analysis
- Keyword matching and scoring

See `src/services/api.js` for available endpoints.

## Custom Hooks

- `useResume()` - Manage resume upload and parsing

See `src/hooks/` for more custom hooks.

## Utility Functions

- File validation and parsing utilities in `src/utils/fileParser.js`

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or open an issue in the repository.
