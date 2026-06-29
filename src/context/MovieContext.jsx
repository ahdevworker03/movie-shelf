import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { MovieContext } from './movieContext'
import { movieReducer, initialState, SET_SEARCH_RESULTS, SET_FINAL_RESULTS } from './movieReducer'
import { searchOMDB } from '../utils/api'
import { setInStorage } from '../utils/storage'

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [defaultMovies, setDefaultMovies] = useState([])
  const [defaultsLoading, setDefaultsLoading] = useState(false)

  // Keep localStorage in sync with the two persisted lists.
  useEffect(() => {
    setInStorage('movieshelf_watchLater', state.watchLater)
  }, [state.watchLater])

  useEffect(() => {
    setInStorage('movieshelf_watched', state.watched)
  }, [state.watched])

  // Triggers an OMDB search and stores results (or an error) in state.
  // Used for live suggestions (debounced).
  const searchMovies = useCallback(async function searchMovies(query) {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const movies = await searchOMDB(query)
      dispatch({ type: SET_SEARCH_RESULTS, payload: movies })
    } catch (err) {
      dispatch({ type: SET_SEARCH_RESULTS, payload: [] })
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetches default movies for the initial discover feed on Home page.
  // Randomises both the search query and the page so each visit feels different.
  const fetchDefaultMovies = useCallback(async function fetchDefaultMovies() {
    const queries = ['avengers', 'star', 'fast', 'dark', 'guardians', 'wonder', 'captain', 'venom', 'jumanji', 'inception']
    setDefaultsLoading(true)
    try {
      const randomQuery = queries[Math.floor(Math.random() * queries.length)]
      const randomPage = Math.floor(Math.random() * 5) + 1
      const movies = await searchOMDB(randomQuery, randomPage)
      setDefaultMovies(movies)
    } catch {
      setDefaultMovies([])
    } finally {
      setDefaultsLoading(false)
    }
  }, [])

  // Resets search state so the discover feed is shown again.
  const resetSearch = useCallback(function resetSearch() {
    setHasSubmitted(false)
    setHasSearched(false)
    dispatch({ type: SET_FINAL_RESULTS, payload: [] })
    dispatch({ type: SET_SEARCH_RESULTS, payload: [] })
  }, [dispatch])

  // Triggers an OMDB search and stores results for the main results section.
  // Used only on explicit submit (Enter / button click).
  const submitSearch = useCallback(async function submitSearch(query) {
    setHasSubmitted(true)
    setIsSubmitting(true)
    setError(null)

    try {
      const movies = await searchOMDB(query)
      dispatch({ type: SET_FINAL_RESULTS, payload: movies })
    } catch (err) {
      dispatch({ type: SET_FINAL_RESULTS, payload: [] })
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }, [dispatch])

  const value = useMemo(() => ({
    state, dispatch, searchMovies, submitSearch, resetSearch, fetchDefaultMovies,
    isLoading, error, hasSearched, hasSubmitted, isSubmitting, defaultMovies, defaultsLoading
  }), [state, dispatch, searchMovies, submitSearch, resetSearch, fetchDefaultMovies,
      isLoading, error, hasSearched, hasSubmitted, isSubmitting, defaultMovies, defaultsLoading])

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}
