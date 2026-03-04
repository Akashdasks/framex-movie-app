import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getGenres } from '../Services/tmbd';
import './Navbar.css';

const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreChange = e => {
    const genreId = e.target.value;
    if (genreId) navigate(`/genre/${genreId}`);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}&page=1`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate('/')}>
        Frame<span>X</span>
      </div>

      {/* SEARCH CENTER */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </form>

      {/* RIGHT NAVIGATION */}
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
