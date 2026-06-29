# MovieShelf

A React app for discovering and managing movies. Search the OMDB catalog, add films to a Watch Later list, and track what you've watched.

## Features

- Search movies with live autocomplete suggestions
- Discover a rotating default feed on the home page
- Create a Watch Later list
- Mark movies as Watched
- Persistent lists saved to localStorage

## Tech Stack

- **React 19** with React Router 7
- **Vite** for build tooling
- **OMDB API** for movie data
- Plain CSS for styling

## Getting Started

```bash
# Install dependencies
npm install

# Set up your API key
cp .env.example .env
# Edit .env and add your OMDB API key

# Start the dev server
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
