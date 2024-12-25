import React from 'react';

interface PrayerStepProps {
  stepNumber: number;
  title: string;
  description: string;
  images?: string[];
  arabicText?: string;
  translation?: string;
  transliteration?: string;
}

const PrayerStep: React.FC<PrayerStepProps> = ({
  stepNumber,
  title,
  description,
  images,
  arabicText,
  translation,
  transliteration,
}) => {
  return (
    <div className="mb-12 scroll-mt-16" id={`step-${stepNumber}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold">
          {stepNumber}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {(arabicText || translation || transliteration) && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            {arabicText && (
              <p className="text-2xl text-right font-arabic text-gray-800 leading-loose">
                {arabicText}
              </p>
            )}
            {transliteration && (
              <p className="text-sm text-gray-600 italic">{transliteration}</p>
            )}
            {translation && (
              <p className="text-sm text-emerald-600">{translation}</p>
            )}
          </div>
        )}

        {images && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-[4/3]">
                <img
                  src={image}
                  alt={`Step ${stepNumber} demonstration ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerStep;