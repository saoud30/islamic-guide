import React from 'react';
import { useQuery } from 'react-query';
import { BookOpen } from 'lucide-react';

const VerseOfDay = () => {
  // Get a random verse number (total verses in Quran: 6236)
  const verseNumber = React.useMemo(() => Math.floor(Math.random() * 6236) + 1, []);

  const { data: verse, isLoading, error } = useQuery(
    ['verseOfDay', verseNumber], 
    async () => {
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${verseNumber}/editions/quran-uthmani,en.asad`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch verse');
      }
      return response.json();
    },
    {
      staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
      retry: 3
    }
  );

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-800">Verse of the Day</h2>
        </div>
        <div className="text-red-500">Failed to load verse. Please try again later.</div>
      </div>
    );
  }

  if (isLoading || !verse) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-800">Verse of the Day</h2>
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Verse of the Day</h2>
      </div>

      <div className="space-y-4">
        <div className="text-right">
          <p className="text-2xl font-arabic leading-loose text-gray-800">
            {verse.data[0].text}
          </p>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-600">{verse.data[1].text}</p>
          <p className="text-sm text-emerald-600 mt-2">
            Surah {verse.data[0].surah.englishName} ({verse.data[0].surah.number}:{verse.data[0].numberInSurah})
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerseOfDay;