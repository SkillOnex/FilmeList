import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Film, Tv } from 'lucide-react';
import MovieCard from './MovieCard';
import { useMovies } from '../context/MoviesContext';

const MovieList = ({ status, title, icon: Icon, emptyMessage }) => {
  const { getMoviesByStatus, updateMovieStatus, removeMovie, toggleFavorite, updateRating } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'movie', 'tv'
  const [sortBy, setSortBy] = useState('addedAt'); // 'addedAt', 'title', 'year', 'rating'
  const [showFilters, setShowFilters] = useState(false);

  const movies = useMemo(() => {
    let filtered = getMoviesByStatus(status);

    // Filtro de busca
    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro de tipo
    if (filterType !== 'all') {
      filtered = filtered.filter((movie) => movie.type === filterType);
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          const yearA = a.releaseDate ? new Date(a.releaseDate).getFullYear() : 0;
          const yearB = b.releaseDate ? new Date(b.releaseDate).getFullYear() : 0;
          return yearB - yearA;
        case 'rating':
          const ratingA = a.personalRating || 0;
          const ratingB = b.personalRating || 0;
          return ratingB - ratingA;
        case 'addedAt':
        default:
          return new Date(b.addedAt) - new Date(a.addedAt);
      }
    });

    return filtered;
  }, [status, searchQuery, filterType, sortBy, getMoviesByStatus]);

  const allMovies = getMoviesByStatus(status);

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-gray-400" />}
          <h2 className="text-lg font-medium text-white">
            {title}
            <span className="ml-2 text-sm text-gray-500 font-normal">
              ({allMovies.length})
            </span>
          </h2>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 hover:bg-[#0a0a0a] rounded-lg transition-colors"
        >
          <Filter className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="mb-6 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar na lista..."
              className="w-full pl-10 pr-4 py-2 bg-black border border-[#1a1a1a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] text-sm"
            />
          </div>

          {/* Filtros e Ordenação */}
          <div className="grid grid-cols-2 gap-4">
            {/* Filtro de tipo */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">Tipo</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === 'all'
                      ? 'bg-white text-black'
                      : 'bg-[#0a0a0a] border border-[#1a1a1a] text-gray-400 hover:border-[#2a2a2a]'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterType('movie')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                    filterType === 'movie'
                      ? 'bg-white text-black'
                      : 'bg-[#0a0a0a] border border-[#1a1a1a] text-gray-400 hover:border-[#2a2a2a]'
                  }`}
                >
                  <Film className="w-4 h-4" />
                  Filmes
                </button>
                <button
                  onClick={() => setFilterType('tv')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                    filterType === 'tv'
                      ? 'bg-white text-black'
                      : 'bg-[#0a0a0a] border border-[#1a1a1a] text-gray-400 hover:border-[#2a2a2a]'
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  Séries
                </button>
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]"
              >
                <option value="addedAt">Mais recente</option>
                <option value="title">Título</option>
                <option value="year">Ano</option>
                {status === 'watched' && <option value="rating">Avaliação</option>}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Lista de filmes */}
      {movies.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onStatusChange={updateMovieStatus}
              onRemove={removeMovie}
              onToggleFavorite={toggleFavorite}
              onUpdateRating={updateRating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
