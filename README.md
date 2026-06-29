# MovieShelf 🎬

A modern React application for discovering, searching, and managing your movie watchlist. Powered by the OMDB API, MovieShelf lets you search thousands of films, save them to a Watch Later list, and track what you've already watched — all with a clean, responsive UI and localStorage persistence.

## Features

- **Live Search** — Search movies with a debounced autocomplete dropdown that shows posters, titles, and years
- **Discover Feed** — A rotating default movie feed on the home page so there's always something to browse
- **Watch Later** — Add movies to a personal Watch Later list with one click
- **Watched Tracking** — Move movies from Watch Later to Watched as you go
- **Persistent Lists** — Your Watch Later and Watched lists survive page refreshes via localStorage
- **404 Handling** — Unknown routes show a friendly "Page not found" page
- **Error Resilience** — App-level Error Boundary catches crashes gracefully
- **Accessible** — ARIA labels, roles, and semantic HTML for screen reader support
- **Responsive Grid** — CSS Grid layout adapts from 1 column on mobile to 4 columns on desktop
- **Keyboard Friendly** — Focus-visible outlines for keyboard navigation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Data API | [OMDB API](https://www.omdbapi.com/) |
| State | React Context + useReducer + useState |
| Persistence | localStorage with type validation |
| Styling | Plain CSS (no frameworks) |
| Linting | ESLint with React Hooks plugin |

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root layout, routes, providers
├── context/              # Global state (reducer + provider)
├── hooks/                # Custom React hooks
├── pages/                # Route-level page components
├── components/           # Reusable UI components
└── utils/                # API calls, storage helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- An [OMDB API key](https://www.omdbapi.com/apikey.aspx) (free tier available)

### Setup

```bash
# Clone the repository
git clone https://github.com/ahdevworker03/movie-shelf.git
cd movie-shelf

# Install dependencies
npm install

# Configure your API key
cp .env.example .env
# Edit .env and set VITE_OMDB_API_KEY=your_key_here

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the app for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Deployment

### GitHub Pages

The app is configured for GitHub Pages deployment. The `base` path is set to `/movie-shelf/` in `vite.config.js`.

**Automatic (GitHub Actions):** Push to the `main` branch and the included workflow will build and deploy to the `gh-pages` branch automatically.

**Manual:** Run `npm run deploy` to build and push the `dist/` folder to the `gh-pages` branch.

Once deployed, the app will be live at:
```
https://ahdevworker03.github.io/movie-shelf/
```

### Configuration

All environment variables are documented in `.env.example`:

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

The API key is loaded at build time via `import.meta.env.VITE_OMDB_API_KEY` and is **never committed** to the repository (`.env` is gitignored).

## License

MIT
