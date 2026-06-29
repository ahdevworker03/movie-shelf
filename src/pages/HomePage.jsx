import { useEffect } from 'react'
import { useMovieContext } from '../hooks/useMovieContext'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

function HomePage() {
  const { fetchDefaultMovies, resetSearch } = useMovieContext()

  useEffect(() => {
    resetSearch()
    fetchDefaultMovies()
  }, [fetchDefaultMovies, resetSearch])

  return (
    <div className="page home-page">
      <SearchBar />
      <SearchResults />
    </div>
  )
}

export default HomePage
