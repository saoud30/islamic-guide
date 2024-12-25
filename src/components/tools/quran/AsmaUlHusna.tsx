import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Search, Star } from 'lucide-react';

interface Name {
  number: number;
  name: string;
  transliteration: string;
  en: {
    meaning: string;
  };
}

const AsmaUlHusna = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('asmaUlHusnaFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const { data: names, isLoading } = useQuery<Name[]>(
    'asmaUlHusna',
    async () => {
      const response = await fetch('https://api.aladhan.com/v1/asmaAlHusna');
      const data = await response.json();
      return data.data;
    }
  );

  const toggleFavorite = (number: number) => {
    const newFavorites = favorites.includes(number)
      ? favorites.filter(n => n !== number)
      : [...favorites, number];
    
    setFavorites(newFavorites);
    localStorage.setItem('asmaUlHusnaFavorites', JSON.stringify(newFavorites));
  };

  const filteredNames = names?.filter(name => 
    name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.en.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Al-Asma-ul-Husna</h2>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, transliteration, or meaning..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNames?.map((name) => (
            <div
              key={name.number}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">#{name.number}</span>
                <button
                  onClick={() => toggleFavorite(name.number)}
                  className="text-gray-400 hover:text-amber-500"
                >
                  <Star
                    className={`w-5 h-5 ${
                      favorites.includes(name.number)
                        ? 'fill-amber-500 text-amber-500'
                        : ''
                    }`}
                  />
                </button>
              </div>
              <div className="text-right mb-2">
                <p className="text-2xl font-arabic text-gray-800">{name.name}</p>
              </div>
              <p className="text-sm text-emerald-600 mb-1">{name.transliteration}</p>
              <p className="text-sm text-gray-600">{name.en.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AsmaUlHusna;