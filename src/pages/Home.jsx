import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GenreSection from '../components/GenreSection';
import {
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from '../Services/tmbd';
import './Home.css';

const Home = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentHero, setCurrentHero] = useState(0);

  // Load trending movies for hero
  useEffect(() => {
    const loadHero = async () => {
      const data = await getTrendingMovies();
      setHeroMovies(data.results.slice(0, 5));
    };
    loadHero();
  }, []);

  // Auto rotate hero
  useEffect(() => {
    if (!heroMovies.length) return;

    const interval = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroMovies]);

  const heroMovie = heroMovies[currentHero];

  return (
    <div className="home-container">
      {heroMovie && (
        <Link
          to={`/movie/${heroMovie.id}`}
          className="hero clickable-hero"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
          }}
        >
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1 className="movie-title">{heroMovie.title}</h1>

            <div className="movie-meta">
              <span className="rating">
                ⭐ {heroMovie.vote_average.toFixed(1)}
              </span>
              <span>{heroMovie.release_date}</span>
            </div>

            <p className="overview">{heroMovie.overview.slice(0, 180)}...</p>
          </div>
        </Link>
      )}

      <div className="sections-wrapper">
        <GenreSection title="🔥 Trending" fetchFunction={getTrendingMovies} />

        <GenreSection title="⭐ Top Rated" fetchFunction={getTopRatedMovies} />

        <GenreSection title="🎬 Popular" fetchFunction={getPopularMovies} />

        <GenreSection
          title="🎞 Now Playing"
          fetchFunction={getNowPlayingMovies}
        />

        <GenreSection title="⏳ Upcoming" fetchFunction={getUpcomingMovies} />
      </div>
    </div>
  );
};

export default Home;
