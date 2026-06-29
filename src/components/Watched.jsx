import { useMovieContext } from '../hooks/useMovieContext'
import { REMOVE_FROM_WATCHED } from '../context/movieReducer'
import MovieCard from './MovieCard'
import EmptyState from './EmptyState'
import './Section.css'

function Watched() {
  const { state, dispatch } = useMovieContext()
  const { watched } = state

  return (
    <section className="section">
      <h2>Watched</h2>
      {watched.length === 0 ? (
        <EmptyState message="No movies watched yet" />
      ) : (
        <div className="movie-list">
          {watched.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={() =>
                dispatch({ type: REMOVE_FROM_WATCHED, payload: movie.id })
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Watched
