import { getFromStorage } from '../utils/storage'

// ---------------------------------------------------------------------------
// Action types  (exported so components can dispatch by name)
// ---------------------------------------------------------------------------
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_FINAL_RESULTS = 'SET_FINAL_RESULTS'
export const ADD_TO_WATCH_LATER = 'ADD_TO_WATCH_LATER'
export const ADD_TO_WATCHED = 'ADD_TO_WATCHED'
export const REMOVE_FROM_WATCH_LATER = 'REMOVE_FROM_WATCH_LATER'
export const REMOVE_FROM_WATCHED = 'REMOVE_FROM_WATCHED'

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
export const initialState = {
  searchResults: [],
  finalResults: [],
  // Persisted lists survive page refresh; searchResults intentionally resets.
  watchLater: getFromStorage('movieshelf_watchLater'),
  watched: getFromStorage('movieshelf_watched'),
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// A movie is a duplicate when it already exists in the target list.
// This prevents the same title appearing in Watch Later or Watched twice.
function isDuplicate(list, movieId) {
  return list.some((m) => m.id === movieId)
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------
export function movieReducer(state, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload }

    case SET_FINAL_RESULTS:
      return { ...state, finalResults: action.payload }

    case ADD_TO_WATCH_LATER: {
      if (
        isDuplicate(state.watchLater, action.payload.id) ||
        isDuplicate(state.watched, action.payload.id)
      ) {
        console.warn('Movie already exists in your list')
        return state
      }
      return {
        ...state,
        searchResults: state.searchResults.filter((m) => m.id !== action.payload.id),
        finalResults: state.finalResults.filter((m) => m.id !== action.payload.id),
        watchLater: [...state.watchLater, action.payload],
      }
    }

    case ADD_TO_WATCHED: {
      if (isDuplicate(state.watched, action.payload.id)) {
        console.warn('Movie already in watched list')
        return state
      }
      return {
        ...state,
        watchLater: state.watchLater.filter((m) => m.id !== action.payload.id),
        watched: [...state.watched, action.payload],
      }
    }

    case REMOVE_FROM_WATCH_LATER:
      return {
        ...state,
        watchLater: state.watchLater.filter((m) => m.id !== action.payload),
      }

    case REMOVE_FROM_WATCHED:
      return {
        ...state,
        watched: state.watched.filter((m) => m.id !== action.payload),
      }

    default:
      return state
  }
}
