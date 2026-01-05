// Configuração da API TMDB
// Você precisará obter uma chave de API gratuita em https://www.themoviedb.org/settings/api
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'a8e29d5c2a475bbac50959dad9587762';
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const API_ENDPOINTS = {
  SEARCH_MOVIE: `${API_BASE_URL}/search/movie`,
  SEARCH_TV: `${API_BASE_URL}/search/tv`,
  MOVIE_DETAILS: (id) => `${API_BASE_URL}/movie/${id}`,
  TV_DETAILS: (id) => `${API_BASE_URL}/tv/${id}`,
};

