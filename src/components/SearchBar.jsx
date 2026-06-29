import { useState, useEffect, useRef } from 'react'
import { useMovieContext } from '../hooks/useMovieContext'
import { ADD_TO_WATCH_LATER } from '../context/movieReducer'
import './SearchBar.css'

function SearchBar() {
  const { searchMovies, submitSearch, state, dispatch, isLoading, error, hasSearched } = useMovieContext()
  const { searchResults } = state
  const [query, setQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (query.trim()) {
      debounceRef.current = setTimeout(() => {
        searchMovies(query.trim())
      }, 400)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
    }, [query, searchMovies])

  function handleChange(e) {
    setQuery(e.target.value)
    if (e.target.value.trim()) {
      setShowDropdown(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      submitSearch(query.trim())
      setShowDropdown(false)
    }
  }

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleChange}
          aria-label="Search for a movie"
        />
        <button type="submit" className="search-submit-btn">Search</button>
      </form>
      {showDropdown && query.trim().length > 0 && (
        <div className="suggestions-dropdown">
          {isLoading && <div className="dropdown-status">Searching...</div>}
          {!isLoading && error && <div className="dropdown-status">{error}</div>}
          {!isLoading && !error && hasSearched && searchResults.length === 0 && (
            <div className="dropdown-status">No results found</div>
          )}
          {!isLoading && !error && searchResults.length > 0 && (
            <ul className="suggestions-list" role="listbox" aria-label="Search suggestions">
              {searchResults.slice(0, 10).map((movie) => (
                <li key={movie.id} className="suggestion-item" role="option">
                  <div className="suggestion-poster">
                    {movie.poster ? (
                      <img src={movie.poster} alt={movie.title} />
                    ) : (
                      <div className="suggestion-poster-placeholder" />
                    )}
                  </div>
                  <div className="suggestion-info">
                    <span className="suggestion-title">{movie.title}</span>
                    <span className="suggestion-year">{movie.year}</span>
                  </div>
                  <button
                    className="suggestion-add-btn"
                    onClick={() =>
                      dispatch({ type: ADD_TO_WATCH_LATER, payload: movie })
                    }
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
