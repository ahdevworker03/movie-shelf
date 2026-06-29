import { memo } from 'react'
import './MovieCard.css'

// Memoised so cards in the Watched list don't re-render when unrelated
// state (e.g. searchResults) changes.  Props change only when the movie
// itself or its callbacks are recreated.
const MovieCard = memo(function MovieCard({ movie, onWatchLater, onWatched, onRemove }) {
  const { poster, title, year, rating } = movie
  const posterSrc = poster || 'https://via.placeholder.com/300x450?text=No+Poster'

  return (
    <div className="movie-card">
      <img
        className="movie-card__poster"
        src={posterSrc}
        alt={`${title} poster`}
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__year">{year}</p>
        <p className="movie-card__rating" aria-label={`Rating ${rating}`}>{'\u2B50'} {rating}</p>
        <div className="movie-card__actions">
          {onWatchLater && (
            <button
              className="movie-card__btn movie-card__btn--later"
              onClick={onWatchLater}
            >
              Add to Watch Later
            </button>
          )}
          {onWatched && (
            <button
              className="movie-card__btn movie-card__btn--watched"
              onClick={onWatched}
            >
              Mark as Watched
            </button>
          )}
          {onRemove && (
            <button
              className="movie-card__btn movie-card__btn--remove"
              onClick={onRemove}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

export default MovieCard
