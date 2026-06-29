import { useMovieContext } from '../hooks/useMovieContext'
import { ADD_TO_WATCHED, REMOVE_FROM_WATCH_LATER } from '../context/movieReducer'
import MovieCard from './MovieCard'
import EmptyState from './EmptyState'
import './Section.css'

function WatchLater() {
  const { state, dispatch } = useMovieContext()
  const { watchLater } = state

  return (
    <section className="section">
      <h2>Watch Later</h2>
      {watchLater.length === 0 ? (
        <EmptyState message="No movies in your watch later list" />
      ) : (
        <div className="movie-list">
          {watchLater.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatched={() =>
                dispatch({ type: ADD_TO_WATCHED, payload: movie })
              }
              onRemove={() =>
                dispatch({ type: REMOVE_FROM_WATCH_LATER, payload: movie.id })
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default WatchLater
