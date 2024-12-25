import React, { useState } from 'react';
import { Search, Book, ExternalLink } from 'lucide-react';
import { searchWord, getWordDetails } from '../../../services/quranTranslation';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
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

const WordTranslation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedWord, setSelectedWord] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await searchWord(searchTerm);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordSelect = async (word: string) => {
    setIsLoading(true);
    try {
      const details = await getWordDetails(word);
      if (details) {
        setSelectedWord(details);
      }
    } catch (error) {
      console.error('Failed to fetch word details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Book className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Word Translation</h2>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search Arabic word or English meaning..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              dir="auto"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleWordSelect(result.word)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-2xl font-arabic mb-2">{result.word}</p>
                      <p className="text-sm text-emerald-600">{result.transliteration}</p>
                      <p className="text-gray-600">{result.translation}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-emerald-50 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Word Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-arabic text-center mb-2">{selectedWord.word}</p>
                  <p className="text-center text-emerald-600">{selectedWord.transliteration}</p>
                  <p className="text-center text-gray-700">{selectedWord.translation}</p>
                </div>

                {selectedWord.root && (
                  <div className="pt-4 border-t border-emerald-100">
                    <p className="text-sm text-gray-600">
                      Root: <span className="font-arabic text-lg">{selectedWord.root}</span>
                    </p>
                  </div>
                )}

                {selectedWord.partOfSpeech && (
                  <p className="text-sm text-gray-600">
                    Part of Speech: <span className="font-medium">{selectedWord.partOfSpeech}</span>
                  </p>
                )}

                {selectedWord.examples && selectedWord.examples.length > 0 && (
                  <div className="pt-4 border-t border-emerald-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Examples in Quran:</h4>
                    {selectedWord.examples.map((example, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg mb-2">
                        <p className="text-right font-arabic mb-1">{example.text}</p>
                        <p className="text-sm text-gray-500">
                          Surah {example.surah}, Ayah {example.ayah}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WordTranslation;