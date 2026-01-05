const STORAGE_KEY = 'discordia-movies';

// Função helper para converter formato do banco para formato do app
const formatMovieFromDB = (movie) => {
  // Se já está no formato do app (localStorage), retorna como está
  if (movie.addedAt || movie.releaseDate) {
    return movie;
  }
  // Se está no formato do banco, converte
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster: movie.poster,
    releaseDate: movie.release_date,
    rating: movie.rating,
    type: movie.type,
    status: movie.status,
    favorite: movie.favorite,
    personalRating: movie.personal_rating,
    addedAt: movie.added_at || movie.addedAt,
  };
};

// Função para salvar no localStorage (fallback)
const saveToLocalStorage = (movies) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

// Função para carregar do localStorage (fallback)
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return [];
  }
};

// Função para fazer requisições à API
const apiRequest = async (method, body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch('/api/movies', options);
    if (!response.ok) throw new Error('Erro na API');
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição API:', error);
    throw error;
  }
};

export const moviesService = {
  // Carregar todos os filmes
  async getAllMovies() {
    try {
      const data = await apiRequest('GET');
      return (data || []).map(formatMovieFromDB);
    } catch (error) {
      console.warn('API não disponível, usando localStorage');
      return loadFromLocalStorage().map(formatMovieFromDB);
    }
  },

  // Adicionar filme
  async addMovie(movie) {
    const newMovie = {
      ...movie,
      id: movie.id || Date.now(),
      addedAt: new Date().toISOString(),
      status: movie.status || 'toWatch',
      favorite: movie.favorite || false,
      personalRating: movie.personalRating || null,
    };

    try {
      const data = await apiRequest('POST', newMovie);
      return formatMovieFromDB(data);
    } catch (error) {
      console.warn('API não disponível, usando localStorage');
      const movies = loadFromLocalStorage();
      movies.unshift(newMovie);
      saveToLocalStorage(movies);
      return newMovie;
    }
  },

  // Atualizar filme
  async updateMovie(id, updates) {
    try {
      const data = await apiRequest('PUT', { id, updates });
      return formatMovieFromDB(data);
    } catch (error) {
      console.warn('API não disponível, usando localStorage');
      const movies = loadFromLocalStorage();
      const index = movies.findIndex((m) => m.id === id);
      if (index !== -1) {
        movies[index] = { ...movies[index], ...updates };
        saveToLocalStorage(movies);
        return movies[index];
      }
      return null;
    }
  },

  // Remover filme
  async deleteMovie(id) {
    try {
      await apiRequest('DELETE', { id });
      return true;
    } catch (error) {
      console.warn('API não disponível, usando localStorage');
      const movies = loadFromLocalStorage();
      const filtered = movies.filter((m) => m.id !== id);
      saveToLocalStorage(filtered);
      return true;
    }
  },
};

// Exportar formatMovieFromDB para uso no contexto
export { formatMovieFromDB };
