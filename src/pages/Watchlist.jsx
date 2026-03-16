import { useWatchlist } from '../context/WatchlistContext';
import { useNavigate } from 'react-router-dom';
import './Watchlist.css';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-empty">
        <h2>Your watchlist is empty</h2>
        <button onClick={() => navigate('/')}>Browse Movies</button>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <h1>My Watchlist</h1>
      <div className="watchlist-grid">
        {watchlist.map(movie => (
          <div key={movie.id} className="watchlist-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            <div className="watchlist-card-info">
              <h3>{movie.title}</h3>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <button onClick={() => removeFromWatchlist(movie.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
