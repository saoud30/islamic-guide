import React, { useState } from 'react';
import { BookOpen, Star, StarOff } from 'lucide-react';

interface Dua {
  id: string;
  arabic: string;
  translation: string;
  transliteration: string;
  category: string;
  favorite: boolean;
}

const DuaCollection = () => {
  const [duas, setDuas] = useState<Dua[]>([
    {
      id: '1',
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      translation: 'Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.',
      transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina adhaban-nar',
      category: 'Daily',
      favorite: false,
    },
    {
      id: '2',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
      translation: 'O Allah, I ask You for guidance, piety, chastity and self-sufficiency.',
      transliteration: 'Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina',
      category: 'Morning',
      favorite: false,
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (id: string) => {
    setDuas(duas.map(dua =>
      dua.id === id ? { ...dua, favorite: !dua.favorite } : dua
    ));
  };

  const filteredDuas = duas.filter(dua => {
    const matchesFilter = filter === 'all' || 
      (filter === 'favorites' ? dua.favorite : dua.category.toLowerCase() === filter);
    
    const matchesSearch = searchTerm === '' ||
      dua.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Dua Collection</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search duas..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'favorites', 'daily', 'morning', 'evening'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  filter === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredDuas.map((dua) => (
            <div key={dua.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <p className="text-xl font-arabic text-gray-800 leading-relaxed">
                  {dua.arabic}
                </p>
                <button
                  onClick={() => toggleFavorite(dua.id)}
                  className="text-gray-400 hover:text-amber-500"
                >
                  {dua.favorite ? (
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ) : (
                    <StarOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-emerald-600">{dua.transliteration}</p>
              <p className="text-gray-600">{dua.translation}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category: {dua.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuaCollection;