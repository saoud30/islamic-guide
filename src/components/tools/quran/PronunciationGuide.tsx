import React from 'react';
import { Volume2 } from 'lucide-react';

const PronunciationGuide = () => {
  const letters = [
    { arabic: 'ا', transliteration: 'alif', sound: 'a', example: 'أَحَد (ahad)' },
    { arabic: 'ب', transliteration: 'ba', sound: 'b', example: 'بَيْت (bayt)' },
    { arabic: 'ت', transliteration: 'ta', sound: 't', example: 'تِين (teen)' },
    { arabic: 'ث', transliteration: 'tha', sound: 'th', example: 'ثَوْب (thawb)' },
    { arabic: 'ج', transliteration: 'jim', sound: 'j', example: 'جَنَّة (jannah)' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Volume2 className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Pronunciation Guide</h2>
      </div>

      <div className="space-y-4">
        {letters.map((letter) => (
          <div
            key={letter.arabic}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-arabic text-gray-800">
                {letter.arabic}
              </span>
              <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                Transliteration: <span className="font-medium">{letter.transliteration}</span>
              </p>
              <p className="text-sm text-gray-600">
                Sound: <span className="font-medium">{letter.sound}</span>
              </p>
              <p className="text-sm text-emerald-600">
                Example: {letter.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PronunciationGuide;