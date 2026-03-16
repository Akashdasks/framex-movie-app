import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieTrailer } from '../Services/tmbd';
import TrailerModal from '../components/TrailerModal';
import { useWatchlist } from '../context/WatchlistContext';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchDetails();
  }, [id]);

  const handleTrailer = async () => {
    const key = await getMovieTrailer(id);
    if (key) {
      setVideoKey(key);
      setShowModal(true);
    }
  };
  const handleWatchlist = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-hero"></div>
        <div className="loading-title"></div>
        <div className="loading-text"></div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="movie-details">
      {/* HERO */}
      <div
        className="hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="movie-meta">
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime} min</span>
          </div>
        </div>
      </div>

      {/* GLASS PANEL */}
      <div className="content-wrapper">
        <div className="glass-panel">
          <div className="poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="details-section">
            <div className="genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="overview">{movie.overview}</p>

            <button className="trailer-btn" onClick={handleTrailer}>
              ▶ Watch Trailer
            </button>
            <button
              className={`watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
              onClick={handleWatchlist}
            >
              {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <TrailerModal videoKey={videoKey} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default MovieDetails;
