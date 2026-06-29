const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY

if (!OMDB_API_KEY) {
  throw new Error('VITE_OMDB_API_KEY is not set — create a .env file with your OMDB API key (see .env.example)')
}

const SAFE_ERRORS = {
  FETCH: 'Unable to connect. Please check your internet connection.',
  SERVER: 'Server error. Please try again.',
  PARSE: 'Unexpected response from server.',
}

// The OMDB Search endpoint returns flat uppercase keys (Title, Year, Poster, imdbID)
// while our app uses camelCase.  This normalises one movie object.
function transformOMDBMovie(movie) {
  if (!movie || typeof movie !== 'object') return null
  return {
    id: movie.imdbID || '',
    title: movie.Title || 'Unknown',
    year: movie.Year || 'N/A',
    rating: movie.imdbRating || 'N/A',
    poster: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null,
  }
}

// Maps raw OMDB error strings to user-safe messages.
function safeOMDBError(raw) {
  if (!raw || typeof raw !== 'string') return 'Something went wrong. Please try again.'
  if (raw === 'Movie not found!') return 'No movies found'
  if (raw === 'Too many results.') return 'Please refine your search'
  if (raw === 'Incorrect IMDb ID.') return 'No movies found'
  return 'Something went wrong. Please try again.'
}

// Searches OMDB for movies matching `query` and returns normalised results.
// Accepts an optional `page` parameter for pagination (defaults to 1).
// Throws on network failure or when OMDB returns an error.
export async function searchOMDB(query, page = 1) {
  let res
  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    res = await fetch(url)
  } catch {
    throw new Error(SAFE_ERRORS.FETCH)
  }

  if (!res.ok) {
    throw new Error(SAFE_ERRORS.SERVER)
  }

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error(SAFE_ERRORS.PARSE)
  }

  if (data.Response === 'False') {
    throw new Error(safeOMDBError(data.Error))
  }

  if (!Array.isArray(data.Search) || data.Search.length === 0) {
    throw new Error('No movies found')
  }

  return data.Search.map(transformOMDBMovie).filter(Boolean)
}
