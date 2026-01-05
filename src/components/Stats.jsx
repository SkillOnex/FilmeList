import { Film, Tv, Eye, EyeOff, Heart, BarChart3 } from 'lucide-react';
import { useMovies } from '../context/MoviesContext';

const StatCard = ({ icon: Icon, label, value, color = 'text-white' }) => (
  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4">
    <div className="flex items-center justify-between mb-2">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-2xl font-bold text-white">{value}</span>
    </div>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const Stats = () => {
  const { getStats } = useMovies();
  const stats = getStats();

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-medium text-white">Estatísticas</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard icon={BarChart3} label="Total" value={stats.total} color="text-blue-400" />
        <StatCard icon={EyeOff} label="Para ver" value={stats.toWatch} color="text-yellow-400" />
        <StatCard icon={Eye} label="Vistos" value={stats.watched} color="text-green-400" />
        <StatCard icon={Heart} label="Favoritos" value={stats.favorites} color="text-red-400" />
        <StatCard icon={Film} label="Filmes" value={stats.moviesCount} color="text-purple-400" />
        <StatCard icon={Tv} label="Séries" value={stats.tvCount} color="text-pink-400" />
      </div>
    </div>
  );
};

export default Stats;

