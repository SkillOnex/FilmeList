import { createContext, useContext, useState, useEffect } from 'react';
import { moviesService } from '../services/moviesService';

const MoviesContext = createContext();

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies deve ser usado dentro de MoviesProvider');
  }
  return context;
};

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar filmes do banco ao inicializar
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await moviesService.getAllMovies();
      setMovies(data);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
      setError('Erro ao carregar filmes. Tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movie) => {
    try {
      const newMovie = await moviesService.addMovie(movie);
      setMovies((prev) => [newMovie, ...prev]);
    } catch (err) {
      console.error('Erro ao adicionar filme:', err);
      setError('Erro ao adicionar filme. Tente novamente.');
    }
  };

  const removeMovie = async (id) => {
    try {
      await moviesService.deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error('Erro ao remover filme:', err);
      setError('Erro ao remover filme. Tente novamente.');
    }
  };

  const updateMovieStatus = async (id, status) => {
    try {
      await moviesService.updateMovie(id, { status });
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === id ? { ...movie, status } : movie
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      setError('Erro ao atualizar status. Tente novamente.');
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const movie = movies.find((m) => m.id === id);
      const newFavorite = !movie?.favorite;
      await moviesService.updateMovie(id, { favorite: newFavorite });
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === id ? { ...movie, favorite: newFavorite } : movie
        )
      );
    } catch (err) {
      console.error('Erro ao favoritar:', err);
      setError('Erro ao favoritar. Tente novamente.');
    }
  };

  const updateRating = async (id, rating) => {
    try {
      await moviesService.updateMovie(id, { personal_rating: rating });
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === id ? { ...movie, personalRating: rating } : movie
        )
      );
    } catch (err) {
      console.error('Erro ao avaliar:', err);
      setError('Erro ao avaliar. Tente novamente.');
    }
  };

  const getMoviesByStatus = (status) => {
    return movies.filter((movie) => movie.status === status);
  };

  const getStats = () => {
    const total = movies.length;
    const watched = movies.filter((m) => m.status === 'watched').length;
    const toWatch = movies.filter((m) => m.status === 'toWatch').length;
    const favorites = movies.filter((m) => m.favorite).length;
    const moviesCount = movies.filter((m) => m.type === 'movie').length;
    const tvCount = movies.filter((m) => m.type === 'tv').length;
    
    return {
      total,
      watched,
      toWatch,
      favorites,
      moviesCount,
      tvCount,
    };
  };

  const value = {
    movies,
    loading,
    error,
    addMovie,
    removeMovie,
    updateMovieStatus,
    toggleFavorite,
    updateRating,
    getMoviesByStatus,
    getStats,
    reloadMovies: loadMovies,
  };

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
};
