import { kv } from '@vercel/kv';

const STORAGE_KEY = 'discordia:movies';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET': {
        const movies = await kv.get(STORAGE_KEY);
        return res.status(200).json(movies || []);
      }

      case 'POST': {
        const movie = req.body;
        const movies = (await kv.get(STORAGE_KEY)) || [];
        const newMovie = {
          ...movie,
          id: movie.id || Date.now(),
          addedAt: new Date().toISOString(),
          status: movie.status || 'toWatch',
          favorite: movie.favorite || false,
          personalRating: movie.personalRating || null,
        };
        movies.unshift(newMovie);
        await kv.set(STORAGE_KEY, movies);
        return res.status(201).json(newMovie);
      }

      case 'PUT': {
        const { id, updates } = req.body;
        const movies = (await kv.get(STORAGE_KEY)) || [];
        const index = movies.findIndex((m) => m.id === id);
        if (index === -1) {
          return res.status(404).json({ error: 'Filme não encontrado' });
        }
        movies[index] = { ...movies[index], ...updates };
        await kv.set(STORAGE_KEY, movies);
        return res.status(200).json(movies[index]);
      }

      case 'DELETE': {
        const { id } = req.body;
        const movies = (await kv.get(STORAGE_KEY)) || [];
        const filtered = movies.filter((m) => m.id !== id);
        await kv.set(STORAGE_KEY, filtered);
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    // Se KV não estiver configurado, retorna array vazio
    if (error.message?.includes('KV') || error.code === 'ENOTFOUND') {
      return res.status(200).json([]);
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
