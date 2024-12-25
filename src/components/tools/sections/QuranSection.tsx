import React from 'react';
import VerseOfDay from '../quran/VerseOfDay';
import RandomHadith from '../quran/RandomHadith';
import BookmarkManager from '../quran/BookmarkManager';
import WordTranslation from '../quran/WordTranslation';
import PronunciationGuide from '../quran/PronunciationGuide';
import AsmaUlHusna from '../quran/AsmaUlHusna';

const QuranSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <VerseOfDay />
      <RandomHadith />
      <BookmarkManager />
      <WordTranslation />
      <PronunciationGuide />
      <AsmaUlHusna />
    </div>
  );
};

export default QuranSection;