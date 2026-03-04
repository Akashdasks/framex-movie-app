import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import './GenreSection.css';

const GenreSection = ({ title, fetchFunction, category }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchFunction();
        setMovies(data?.results || []);
      } catch (error) {
        console.error('Error loading movies:', error);
        setMovies([]);
      }
    };

    loadMovies();
  }, [fetchFunction]);

  return (
    <div className="genre-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>

        <button
          className="view-more-btn"
          onClick={() => navigate(`/category/${category}`)}
        >
          See All
        </button>
      </div>

      <div className="genre-scroll">
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
    </div>
  );
};

export default GenreSection;
