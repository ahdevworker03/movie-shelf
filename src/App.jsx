import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import WatchLaterPage from './pages/WatchLaterPage'
import WatchedPage from './pages/WatchedPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  const navigate = useNavigate()

  // Handle 404.html SPA redirect (GitHub Pages direct URL access)
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect')
    if (redirect) {
      sessionStorage.removeItem('redirect')
      const path = redirect.replace('/movie-shelf/', '').replace(/^\//, '') || '/'
      navigate('/' + path, { replace: true })
    }
  }, [navigate])

  return (
    <ErrorBoundary>
      <MovieProvider>
        <div className="app">
          <Header />
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch-later" element={<WatchLaterPage />} />
              <Route path="/watched" element={<WatchedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </MovieProvider>
    </ErrorBoundary>
  )
}

export default App
