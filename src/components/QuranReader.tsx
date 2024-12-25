import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Play, Pause, Bookmark, SkipForward, SkipBack, List, AlignJustify, Moon } from 'lucide-react';
import type { Surah } from '../types/quran';
import { useQuranAudio } from '../hooks/useQuranAudio';
import SurahHeader from './SurahHeader';
import AudioControls from './AudioControls';
import ViewToggle from './ViewToggle';
import TajweedLegend from './TajweedLegend';
import { parseTajweed } from '../utils/tajweedParser';

const QuranReader = () => {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [viewMode, setViewMode] = useState<'full' | 'individual'>('individual');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTajweed, setShowTajweed] = useState(false);

  const {
    state: { isPlaying },
    playAyah,
    pause,
    setOnEnded
  } = useQuranAudio({
    edition: 'ar.alafasy',
    bitrate: 64
  });

  const { data: surahs } = useQuery<Surah[]>('surahs', () =>
    fetch('https://api.alquran.cloud/v1/surah')
      .then((res) => res.json())
      .then((data) => data.data)
  );

  const { data: surahData } = useQuery(
    ['surah', selectedSurah],
    () =>
      Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/editions/quran-uthmani,en.asad,ur.jalandhry`).then(res => res.json()),
        fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/quran-tajweed`).then(res => res.json())
      ]).then(([regular, tajweed]) => ({
        regular: regular.data,
        tajweed: tajweed.data
      })),
    { enabled: !!selectedSurah }
  );

  useEffect(() => {
    setOnEnded(() => {
      if (surahData && currentAyah < surahData.regular[0].numberOfAyahs) {
        setCurrentAyah(prev => prev + 1);
        playAyah(surahData.regular[0].ayahs[currentAyah].number);
      } else {
        setCurrentAyah(1);
      }
    });
  }, [currentAyah, surahData, playAyah, setOnEnded]);

  const handlePrevious = () => {
    if (currentAyah > 1) {
      setCurrentAyah(prev => prev - 1);
      playAyah(surahData?.regular[0].ayahs[currentAyah - 2].number);
    }
  };

  const handleNext = () => {
    if (surahData && currentAyah < surahData.regular[0].numberOfAyahs) {
      setCurrentAyah(prev => prev + 1);
      playAyah(surahData.regular[0].ayahs[currentAyah].number);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      playAyah(surahData?.regular[0].ayahs[currentAyah - 1].number);
    }
  };

  const handleBookmark = () => {
    const bookmark = {
      surah: selectedSurah,
      ayah: currentAyah,
      timestamp: new Date().toISOString()
    };
    const bookmarks = JSON.parse(localStorage.getItem('quranBookmarks') || '[]');
    localStorage.setItem('quranBookmarks', JSON.stringify([...bookmarks, bookmark]));
  };

  if (!surahs || !surahData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-emerald-200 h-12 w-12"></div>
          <div className="space-y-3">
            <div className="h-4 bg-emerald-200 rounded w-32"></div>
            <div className="h-4 bg-emerald-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    const baseTextClass = isDarkMode ? 'text-gray-100' : 'text-gray-800';
    
    if (viewMode === 'full') {
      const arabicText = showTajweed 
        ? parseTajweed(surahData.tajweed.ayahs.map(ayah => ayah.text).join(' '))
        : surahData.regular[0].ayahs.map(ayah => ayah.text).join(' ');

      return (
        <div className={`space-y-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-xl shadow-lg transition-colors duration-300`}>
          <div className="text-right">
            <p 
              className={`text-3xl leading-loose font-arabic whitespace-pre-wrap ${baseTextClass}`}
              dangerouslySetInnerHTML={{ __html: arabicText }}
            />
          </div>
          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-8 space-y-4`}>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
              {surahData.regular[1].ayahs.map(ayah => ayah.text).join('\n\n')}
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap font-urdu`}>
              {surahData.regular[2].ayahs.map(ayah => ayah.text).join('\n\n')}
            </p>
          </div>
        </div>
      );
    }

    const arabicText = showTajweed
      ? parseTajweed(surahData.tajweed.ayahs[currentAyah - 1].text)
      : surahData.regular[0].ayahs[currentAyah - 1].text;

    return (
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-xl shadow-lg transition-colors duration-300`}>
        <div className="text-right mb-8">
          <p 
            className={`text-4xl leading-loose font-arabic ${baseTextClass}`}
            dangerouslySetInnerHTML={{ __html: arabicText }}
          />
        </div>
        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-8 space-y-4`}>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {surahData.regular[1].ayahs[currentAyah - 1].text}
          </p>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-urdu`}>
            {surahData.regular[2].ayahs[currentAyah - 1].text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SurahHeader
            surahs={surahs}
            selectedSurah={selectedSurah}
            setSelectedSurah={setSelectedSurah}
            setIsPlaying={setCurrentAyah}
            setCurrentAyah={setCurrentAyah}
            isDarkMode={isDarkMode}
          />
          <div className="flex gap-2">
            <ViewToggle
              viewMode={viewMode}
              setViewMode={setViewMode}
              isDarkMode={isDarkMode}
            />
            <button
              onClick={() => setShowTajweed(!showTajweed)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showTajweed ? 'Hide' : 'Show'} Tajweed
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Moon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showTajweed && <TajweedLegend isDarkMode={isDarkMode} />}
        {renderContent()}

        <AudioControls
          viewMode={viewMode}
          currentAyah={currentAyah}
          surahData={surahData.regular}
          isPlaying={isPlaying}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          togglePlay={togglePlay}
          handleBookmark={handleBookmark}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default QuranReader;