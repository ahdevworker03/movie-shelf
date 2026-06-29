import { useMovieContext } from '../hooks/useMovieContext'
import { ADD_TO_WATCH_LATER } from '../context/movieReducer'
import MovieCard from './MovieCard'
import Loading from './Loading'
import EmptyState from './EmptyState'
import './Section.css'

function SearchResults() {
  const { state, dispatch, isLoading, error, hasSubmitted, isSubmitting, defaultMovies, defaultsLoading } = useMovieContext()
  const { finalResults } = state

  return (
    <section className="section">
      <h2>{hasSubmitted ? 'Search Results' : 'Discover'}</h2>
      {isSubmitting && <Loading />}
      {!isSubmitting && hasSubmitted && isLoading && <Loading />}
      {!isSubmitting && hasSubmitted && !isLoading && error && <p className="error">{error}</p>}
      {!isSubmitting && hasSubmitted && !isLoading && !error && finalResults.length === 0 && (
        <EmptyState message="No movies found" />
      )}
      {!isSubmitting && hasSubmitted && !isLoading && !error && finalResults.length > 0 && (
        <div className="movie-list">
          {finalResults.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchLater={() =>
                dispatch({ type: ADD_TO_WATCH_LATER, payload: movie })
              }
            />
          ))}
        </div>
      )}
      {!isSubmitting && !hasSubmitted && (
        defaultsLoading ? (
          <Loading />
        ) : defaultMovies.length > 0 ? (
          <div className="movie-list">
            {defaultMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchLater={() =>
                  dispatch({ type: ADD_TO_WATCH_LATER, payload: movie })
                }
              />
            ))}
          </div>
        ) : (
          <p className="placeholder">No movies yet</p>
        )
      )}
    </section>
  )
}

export default SearchResults
