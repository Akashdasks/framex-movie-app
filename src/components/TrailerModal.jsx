import { useEffect } from 'react';

const TrailerModal = ({ videoKey, onClose }) => {
  // ESC key close
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!videoKey) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm 
                 flex items-center justify-center z-50
                 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] md:w-[800px] aspect-video"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 
                     text-white text-3xl font-bold"
        >
          ✕
        </button>

        {/* YouTube Embed */}
        <iframe
          className="w-full h-full rounded-xl shadow-2xl"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
