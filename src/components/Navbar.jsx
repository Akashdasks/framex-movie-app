import { useEffect, useState } from 'react';
import { useNavigate, NavLink, useSearchParams } from 'react-router-dom';
import { getGenres, searchMovies } from '../Services/tmbd';
import './Navbar.css';

const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Load genres
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  // Sync input with URL query
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  // 🔎 Live search suggestions
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchTerm.length > 2) {
        const data = await searchMovies(searchTerm, 1);
        setSuggestions(data.results.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleSearch = e => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}&page=1`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = movie => {
    navigate(`/movie/${movie.id}`);
    setSearchTerm(movie.title);
    setSuggestions([]);
  };

  const handleGenreChange = e => {
    const genreId = e.target.value;
    if (genreId) navigate(`/genre/${genreId}`);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate('/')}>
        Frame<span>X</span>
      </div>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map(movie => (
                <div
                  key={movie.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(movie)}
                >
                  {movie.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* RIGHT NAV */}
      <div className="nav-right">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/movies" className="nav-link">
          Movies
        </NavLink>
        <NavLink to="/trending" className="nav-link">
          Trending
        </NavLink>
        <NavLink to="/top-rated" className="nav-link">
          Top Rated
        </NavLink>

        <select
          className="genre-dropdown"
          onChange={handleGenreChange}
          defaultValue=""
        >
          <option value="" disabled>
            Genres
          </option>

          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
