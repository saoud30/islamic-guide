import React from 'react';
import SalahIntroduction from './SalahIntroduction';
import PrayerIntroduction from './PrayerIntroduction';
import PrayerChecklist from './PrayerChecklist';
import WuduGuide from './WuduGuide';
import TableOfContents from './TableOfContents';
import PrayerStep from './PrayerStep';
import { prayerSteps, additionalSteps } from './prayerSteps';

const PrayerGuide = () => {
  const allSteps = [...prayerSteps, ...additionalSteps];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 mb-8">Prayer Guide</h1>
      
      <SalahIntroduction />
      <WuduGuide />
      <PrayerChecklist />
      <PrayerIntroduction />
      <TableOfContents steps={allSteps} />
      
      <div className="space-y-12">
        {allSteps.map((step) => (
          <PrayerStep
            key={step.number}
            stepNumber={step.number}
            title={step.title}
            description={step.description}
            images={step.images}
            arabicText={step.arabicText}
            translation={step.translation}
            transliteration={step.transliteration}
          />
        ))}
      </div>
    </div>
  );
};

export default PrayerGuide;