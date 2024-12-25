import React from 'react';
import { Book } from 'lucide-react';
import { hadiths } from '../../../data/hadiths';

const RandomHadith = () => {
  // Get a random hadith
  const randomIndex = Math.floor(Math.random() * hadiths.length);
  const hadith = hadiths[randomIndex];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Book className="w-6 h-6 text-gold-600" />
        <h2 className="text-xl font-semibold text-gray-800">Hadith of the Day</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-800 leading-relaxed">{hadith.text}</p>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">Narrated by: {hadith.narrator}</p>
          <p className="text-sm text-gold-600">
            {hadith.source} • {hadith.reference}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomHadith;