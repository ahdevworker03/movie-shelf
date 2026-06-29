# MovieShelf 🎬

## 🚀 Live Demo

Experience the live deployed version of MovieShelf:

👉 **https://ahdevworker03.github.io/movie-shelf/**

---

## 📌 Overview

MovieShelf is a modern React application for discovering, searching, and managing movies. It uses the OMDB API to fetch movie data and provides a clean workflow for searching films, saving them to a Watch Later list, and tracking watched movies.

The project focuses on state management, routing, persistence, and a clean component-based architecture suitable for production-level React applications.

---

## ✨ Features

- 🔎 **Live Search** — Debounced search with autocomplete suggestions (title, poster, year)
- 🎬 **Movie Discovery Feed** — Default homepage feed showing trending/popular movies
- 📥 **Watch Later List** — Save movies for later viewing
- ✅ **Watched Tracking** — Move movies from Watch Later to Watched
- 💾 **Persistent Storage** — Data persists using localStorage
- 🧭 **Client-Side Routing** — Smooth navigation between pages
- ⚠️ **404 Handling** — Friendly fallback page for invalid routes
- 🧱 **Error Boundary** — Prevents full app crashes
- 📱 **Responsive UI** — Mobile-first grid layout (1 → 4 columns)
- ♿ **Accessible UI** — ARIA labels, semantic structure, keyboard support

---

## 🧱 Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Framework  | React 19                 |
| Routing    | React Router             |
| Build Tool | Vite                     |
| API        | OMDB API                 |
| State      | Context API + useReducer |
| Storage    | localStorage             |
| Styling    | Plain CSS                |
| Linting    | ESLint                   |

---

## 📁 Project Structure

```
src/
├── main.jsx      # App entry point
├── App.jsx       # Routes + layout
├── context/      # Global state (Context + Reducer)
├── hooks/        # Custom hooks
├── pages/        # Route pages
├── components/   # UI components
└── utils/        # API + storage helpers
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- OMDB API Key (free): https://www.omdbapi.com/apikey.aspx

---

### Installation

```bash
git clone https://github.com/ahdevworker03/movie-shelf.git
cd movie-shelf

npm install
```

---

### Environment Setup

Create a `.env` file:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

---

### Run Locally

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 📦 Build & Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build production app     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |
| `npm run deploy`  | Deploy to GitHub Pages   |

---

## 🌍 Deployment

MovieShelf is deployed using **GitHub Pages**.

### Live URL

```
https://ahdevworker03.github.io/movie-shelf/
```

### Notes

- The project uses `vite.config.js` base path: `/movie-shelf/`
- React Router is configured for GitHub Pages compatibility
- Build output is deployed to `gh-pages` branch

---

## 🔐 Environment Variables

All sensitive keys are stored in environment variables and never committed:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

---

## 📄 License

MIT
