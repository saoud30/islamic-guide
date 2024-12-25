interface TranslationResult {
  word: string;
  translation: string;
  transliteration: string;
  root?: string;
  partOfSpeech?: string;
  examples?: Array<{
    text: string;
    surah: number;
    ayah: number;
  }>;
}

// Common Arabic words database
const arabicWordsDB: Record<string, TranslationResult> = {
  'الله': {
    word: 'الله',
    translation: 'Allah (The One True God)',
    transliteration: 'Allah',
    examples: [
      { text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', surah: 1, ayah: 1 }
    ]
  },
  'الرحمن': {
    word: 'الرحمن',
    translation: 'The Most Merciful',
    transliteration: 'Ar-Rahman',
    examples: [
      { text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', surah: 1, ayah: 1 }
    ]
  },
  'الرحيم': {
    word: 'الرحيم',
    translation: 'The Especially Merciful',
    transliteration: 'Ar-Raheem',
    examples: [
      { text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', surah: 1, ayah: 1 }
    ]
  },
  'رب': {
    word: 'رب',
    translation: 'Lord, Master, Sustainer',
    transliteration: 'Rabb',
    root: 'ر-ب-ب',
    partOfSpeech: 'Noun',
    examples: [
      { text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', surah: 1, ayah: 2 }
    ]
  }
};

export async function searchWord(query: string): Promise<TranslationResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const results = Object.values(arabicWordsDB).filter(entry => 
    entry.word.includes(query) || 
    entry.transliteration.toLowerCase().includes(query.toLowerCase()) ||
    entry.translation.toLowerCase().includes(query.toLowerCase())
  );

  return results;
}

export async function getWordDetails(word: string): Promise<TranslationResult | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return arabicWordsDB[word] || null;
}