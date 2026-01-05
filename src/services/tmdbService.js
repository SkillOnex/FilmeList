import axios from 'axios';
import { API_KEY, API_BASE_URL, IMAGE_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const tmdbService = {
  // Buscar filmes
  searchMovies: async (query) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query },
      });
      return response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        type: 'movie',
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw error;
    }
  },

  // Buscar séries
  searchTV: async (query) => {
    try {
      const response = await api.get('/search/tv', {
        params: { query },
      });
      return response.data.results.map(tv => ({
        id: tv.id,
        title: tv.name,
        overview: tv.overview,
        poster: tv.poster_path ? `${IMAGE_BASE_URL}${tv.poster_path}` : null,
        releaseDate: tv.first_air_date,
        rating: tv.vote_average,
        type: 'tv',
      }));
    } catch (error) {
      console.error('Erro ao buscar séries:', error);
      throw error;
    }
  },

  // Buscar filmes e séries juntos
  searchAll: async (query) => {
    try {
      const [movies, tv] = await Promise.all([
        tmdbService.searchMovies(query),
        tmdbService.searchTV(query),
      ]);
      return [...movies, ...tv];
    } catch (error) {
      console.error('Erro ao buscar conteúdo:', error);
      throw error;
    }
  },
};

