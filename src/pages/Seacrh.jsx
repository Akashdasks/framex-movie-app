import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../Services/tmbd';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q');
  const pageParam = parseInt(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  // Sync page state with URL
  useEffect(() => {
    setPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      setLoading(true);
      setFade(true);

      const data = await searchMovies(query, page);

      setTimeout(() => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
        setFade(false);

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 300);
    };

    fetchSearch();
  }, [query, page]);

  const goToPage = number => {
    navigate(`/search?q=${query}&page=${number}`);
  };

  const nextPage = () => {
    if (page < totalPages) {
      goToPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      goToPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Results for "{query}"</h1>

      {/* Movies Grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-6 
        transition-all duration-500 ease-in-out
        ${fade ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-gray-800 rounded-lg animate-pulse"
              />
            ))
          : movies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average.toFixed(1)}
              />
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-12 space-x-2">
          {/* Previous */}
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-2 rounded-md bg-gray-800 text-gray-300 
                       hover:bg-gray-700 disabled:opacity-40 transition"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 2), Math.min(totalPages, page + 3))
            .map(number => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition
                  ${
                    page === number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {number}
              </button>
            ))}

          {/* Next */}
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-3 py-2 rounded-md bg-gray-800 text-gray-300 
                       hover:bg-gray-700 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
