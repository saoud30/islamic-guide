import React from 'react';
import { Play, Pause, Bookmark, SkipForward, SkipBack } from 'lucide-react';

interface AudioControlsProps {
  viewMode: 'full' | 'individual';
  currentAyah: number;
  surahData: any;
  isPlaying: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  togglePlay: () => void;
  handleBookmark: () => void;
  isDarkMode: boolean;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  viewMode,
  currentAyah,
  surahData,
  isPlaying,
  handlePrevious,
  handleNext,
  togglePlay,
  handleBookmark,
  isDarkMode,
}) => {
  const baseButtonClass = `p-3 rounded-full transition-all duration-200 ${
    isDarkMode
      ? 'text-gray-200 hover:bg-gray-700 active:bg-gray-600'
      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
  }`;

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {surahData[0].englishName} • {viewMode === 'individual' ? `Ayah ${currentAyah}/${surahData[0].numberOfAyahs}` : `${surahData[0].numberOfAyahs} Ayahs`}
        </div>
        <div className="flex items-center space-x-2">
          {viewMode === 'individual' && (
            <button
              onClick={handlePrevious}
              disabled={currentAyah === 1}
              className={`${baseButtonClass} disabled:opacity-50`}
            >
              <SkipBack className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={togglePlay}
            className={`${baseButtonClass} bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-emerald-700" />
            ) : (
              <Play className="w-6 h-6 text-emerald-700" />
            )}
          </button>
          {viewMode === 'individual' && (
            <button
              onClick={handleNext}
              disabled={currentAyah === surahData[0].numberOfAyahs}
              className={`${baseButtonClass} disabled:opacity-50`}
            >
              <SkipForward className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={handleBookmark}
            className={baseButtonClass}
            title={viewMode === 'individual' ? "Bookmark this ayah" : "Bookmark this surah"}
          >
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;