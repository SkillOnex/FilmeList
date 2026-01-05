import { Film, Tv, Eye, EyeOff, X, Heart, Star } from 'lucide-react';
import { useState } from 'react';

const MovieCard = ({ movie, onStatusChange, onRemove, onToggleFavorite, onUpdateRating }) => {
  const isWatched = movie.status === 'watched';
  const isTV = movie.type === 'tv';
  const [showRating, setShowRating] = useState(false);

  const handleRatingClick = (e) => {
    e.stopPropagation();
    setShowRating(!showRating);
  };

  const handleRatingSelect = (rating) => {
    onUpdateRating(movie.id, rating);
    setShowRating(false);
  };

  return (
    <div className="group relative">
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-[#0a0a0a] rounded-xl overflow-hidden mb-3 border border-[#1a1a1a]">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isTV ? (
              <Tv className="w-12 h-12 text-gray-700" />
            ) : (
              <Film className="w-12 h-12 text-gray-700" />
            )}
          </div>
        )}
        
        {/* Overlay com ações */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-3 right-3 flex gap-2">
            {/* Favorito */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie.id);
              }}
              className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                movie.favorite
                  ? 'bg-red-500/90 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-black/70'
              }`}
              aria-label="Favoritar"
            >
              <Heart className={`w-4 h-4 ${movie.favorite ? 'fill-current' : ''}`} />
            </button>

            {/* Remover */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(movie.id);
              }}
              className="p-2 bg-black/50 backdrop-blur-sm text-gray-300 hover:bg-black/70 rounded-lg transition-colors"
              aria-label="Remover"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Rating no hover (apenas para vistos) */}
          {isWatched && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="relative">
                <button
                  onClick={handleRatingClick}
                  className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors text-sm"
                >
                  <Star className={`w-4 h-4 ${movie.personalRating ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  <span>{movie.personalRating ? movie.personalRating : 'Avaliar'}</span>
                </button>
                {showRating && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingSelect(rating)}
                        className={`flex-1 p-2 rounded hover:bg-[#1a1a1a] transition-colors ${
                          movie.personalRating === rating ? 'bg-[#1a1a1a]' : ''
                        }`}
                      >
                        <Star className={`w-4 h-4 mx-auto ${
                          movie.personalRating >= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Badge de tipo */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
          {isTV ? 'Série' : 'Filme'}
        </div>
      </div>

      {/* Título */}
      <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 leading-tight">
        {movie.title}
      </h3>

      {/* Ano e Rating */}
      <div className="flex items-center justify-between mb-3">
        {movie.releaseDate && (
          <p className="text-xs text-gray-500">
            {new Date(movie.releaseDate).getFullYear()}
          </p>
        )}
        {movie.personalRating && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-400">{movie.personalRating}</span>
          </div>
        )}
      </div>

      {/* Botão de status */}
      <button
        onClick={() => onStatusChange(movie.id, isWatched ? 'toWatch' : 'watched')}
        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
          isWatched
            ? 'bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30'
            : 'bg-[#0a0a0a] border border-[#1a1a1a] text-white hover:border-[#2a2a2a]'
        }`}
      >
        {isWatched ? (
          <>
            <Eye className="w-4 h-4" />
            <span>Visto</span>
          </>
        ) : (
          <>
            <EyeOff className="w-4 h-4" />
            <span>Para ver</span>
          </>
        )}
      </button>
    </div>
  );
};

export default MovieCard;
