import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async (page = 1) => {
  const response = await api.get('/trending/movie/week', {
    params: { page },
  });
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await api.get('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async id => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const getMovieTrailer = async id => {
  const response = await api.get(`/movie/${id}/videos`);

  const trailers = response.data.results.filter(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailers.length ? trailers[0].key : null;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data;
};

export const getHollywoodMovies = async (page = 1) => {
  const response = await api.get('/discover/movie', {
    params: {
      with_original_language: 'en',
      page,
    },
  });
  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await api.get('/movie/top_rated', {
    params: { page },
  });
  return response.data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const response = await api.get('/movie/now_playing', {
    params: { page },
  });
  return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await api.get('/movie/upcoming', {
    params: { page },
  });
  return response.data;
};
export const getGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};
