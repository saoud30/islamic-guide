import React from 'react';
import type { Surah } from '../types/quran';

interface SurahHeaderProps {
  surahs: Surah[];
  selectedSurah: number;
  setSelectedSurah: (surah: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentAyah: (ayah: number) => void;
  isDarkMode: boolean;
}

const SurahHeader: React.FC<SurahHeaderProps> = ({
  surahs,
  selectedSurah,
  setSelectedSurah,
  setIsPlaying,
  setCurrentAyah,
  isDarkMode,
}) => {
  return (
    <select
      className={`flex-1 p-3 border rounded-lg shadow-sm transition-colors ${
        isDarkMode
          ? 'bg-gray-700 text-gray-200 border-gray-600'
          : 'bg-white text-gray-700 border-gray-200'
      }`}
      value={selectedSurah}
      onChange={(e) => {
        setSelectedSurah(Number(e.target.value));
        setIsPlaying(false);
        setCurrentAyah(1);
      }}
    >
      {surahs.map((surah) => (
        <option
          key={surah.number}
          value={surah.number}
          className={isDarkMode ? 'bg-gray-700' : 'bg-white'}
        >
          {surah.number}. {surah.englishName} ({surah.name})
        </option>
      ))}
    </select>
  );
};

export default SurahHeader;