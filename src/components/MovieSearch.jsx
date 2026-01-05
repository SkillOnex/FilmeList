import { useState, useEffect } from 'react';
import { Search, Film, Tv, Loader2, X, Plus } from 'lucide-react';
import { tmdbService } from '../services/tmdbService';
import { useMovies } from '../context/MoviesContext';

const MovieSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addMovie } = useMovies();

  // Busca em tempo real com debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await tmdbService.searchAll(query);
        setResults(data);
      } catch (err) {
        setError('Erro ao buscar. Verifique sua chave de API do TMDB.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms de debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleAdd = (result) => {
    addMovie(result);
    setResults([]);
    setQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header simplificado */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar filmes e séries..."
              autoFocus
              className="w-full pl-12 pr-4 py-3 bg-black border border-[#1a1a1a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] text-lg"
            />
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-[#1a1a1a] rounded-xl transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="group bg-black border border-[#1a1a1a] rounded-2xl p-3 hover:border-[#2a2a2a] transition-colors cursor-pointer"
                  onClick={() => handleAdd(result)}
                >
                  <div className="flex gap-3">
                    {result.poster ? (
                      <img
                        src={result.poster}
                        alt={result.title}
                        className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-24 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                        {result.type === 'tv' ? (
                          <Tv className="w-6 h-6 text-gray-600" />
                        ) : (
                          <Film className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                          {result.title}
                        </h3>
                        {result.releaseDate && (
                          <p className="text-xs text-gray-500">
                            {new Date(result.releaseDate).getFullYear()}
                          </p>
                        )}
                      </div>
                      <button className="mt-2 w-full flex items-center justify-center gap-1 px-3 py-1.5 bg-white text-black rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                        <Plus className="w-3 h-3" />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && query && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum resultado encontrado</p>
            </div>
          )}

          {!loading && !error && !query && (
            <div className="text-center py-12">
              <p className="text-gray-500">Digite para buscar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
