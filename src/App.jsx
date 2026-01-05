import { useState } from 'react';
import { Plus, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { MoviesProvider, useMovies } from './context/MoviesContext';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import Stats from './components/Stats';

const AppContent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { loading, error } = useMovies();

  return (
    <div className="min-h-screen bg-black">
      {/* Header minimalista */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">
              Filme List
            </h1>
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : (
          <>
            <Stats />
            
            <MovieList
              status="toWatch"
              title="Para ver"
              icon={EyeOff}
              emptyMessage="Nenhum filme ou série adicionado"
            />

            <MovieList
              status="watched"
              title="Já vistos"
              icon={Eye}
              emptyMessage="Nenhum filme ou série marcado como visto"
            />
          </>
        )}
      </main>

      {/* Search Modal */}
      {showSearch && <MovieSearch onClose={() => setShowSearch(false)} />}
    </div>
  );
};

function App() {
  return (
    <MoviesProvider>
      <AppContent />
    </MoviesProvider>
  );
}

export default App;
