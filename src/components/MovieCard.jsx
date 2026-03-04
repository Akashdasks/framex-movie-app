import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ id, title, poster, rating }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div
        className="group relative rounded-2xl overflow-hidden 
                   shadow-lg hover:shadow-2xl 
                   transition duration-300 cursor-pointer"
      >
        {/* Poster */}
        <img
          src={
            poster
              ? `${IMAGE_BASE_URL}${poster}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={title}
          className="w-full h-[420px] object-cover 
                     transition duration-500 
                     group-hover:scale-110"
        />

        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0 
                     bg-gradient-to-t 
                     from-black/90 via-black/40 to-transparent"
        />

        {/* Rating Badge */}
        <div
          className="absolute top-3 right-3 
                     bg-yellow-400 text-black 
                     text-sm font-bold 
                     px-3 py-1 rounded-full shadow-md"
        >
          ⭐{' '}
          {typeof rating === 'number'
            ? rating.toFixed(1)
            : Number(rating || 0).toFixed(1)}
        </div>

        {/* Movie Title */}
        <div className="absolute bottom-0 p-4 w-full">
          <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
