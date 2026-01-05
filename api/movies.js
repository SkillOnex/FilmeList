import { MongoClient } from 'mongodb';

const COLLECTION_NAME = 'movies';
const DB_NAME = 'filmelist';

// Cache da conexão
let cachedClient = null;
let cachedDb = null;

// Função para conectar ao MongoDB
async function connectToDatabase() {
  // Verifica se já existe uma conexão em cache
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Verifica se a URI do MongoDB está configurada
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI não configurada. Configure a variável de ambiente MONGODB_URI');
  }

  try {
    // Conecta ao MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    
    // Cache da conexão
    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    switch (req.method) {
      case 'GET': {
        const movies = await collection.find({}).sort({ addedAt: -1 }).toArray();
        return res.status(200).json(movies || []);
      }

      case 'POST': {
        const movie = req.body;
        const newMovie = {
          ...movie,
          id: movie.id || Date.now(),
          addedAt: new Date().toISOString(),
          status: movie.status || 'toWatch',
          favorite: movie.favorite || false,
          personalRating: movie.personalRating || null,
        };
        
        await collection.insertOne(newMovie);
        return res.status(201).json(newMovie);
      }

      case 'PUT': {
        const { id, updates } = req.body;
        const result = await collection.findOneAndUpdate(
          { id: id },
          { $set: updates },
          { returnDocument: 'after' }
        );
        
        if (!result.value) {
          return res.status(404).json({ error: 'Filme não encontrado' });
        }
        
        return res.status(200).json(result.value);
      }

      case 'DELETE': {
        const { id } = req.body;
        const result = await collection.deleteOne({ id: id });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Filme não encontrado' });
        }
        
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    
    // Se MongoDB não estiver configurado, retorna array vazio para GET
    if (error.message?.includes('MONGODB_URI') || error.message?.includes('Mongo')) {
      if (req.method === 'GET') {
        return res.status(200).json([]);
      }
      return res.status(503).json({ 
        error: 'MongoDB não configurado. Configure a variável de ambiente MONGODB_URI' 
      });
    }
    
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
