import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import {
  getMoviesByGenre,
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
} from '../Services/tmbd';
import './CategoryPage.css';

const CategoryPage = () => {
  const { genreId } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [title, setTitle] = useState('Movies');

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setFadeClass('fade-out');

      let data;

      if (genreId) {
        data = await getMoviesByGenre(genreId, currentPage);
        setTitle('Genre Movies');
      } else if (location.pathname === '/trending') {
        data = await getTrendingMovies(currentPage);
        setTitle('Trending Movies');
      } else if (location.pathname === '/top-rated') {
        data = await getTopRatedMovies(currentPage);
        setTitle('Top Rated Movies');
      } else {
        data = await getPopularMovies(currentPage);
        setTitle('Popular Movies');
      }

      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 50));
      setLoading(false);
      setFadeClass('fade-in');
    };

    loadMovies();
  }, [genreId, currentPage, location.pathname]);

  const handlePageChange = page => {
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="category-container">
      <h1 className="category-title">{title}</h1>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <div className={`movie-grid ${fadeClass}`}>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        {getPageNumbers().map(page => (
          <button
            key={page}
            className={`pagination-number ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
