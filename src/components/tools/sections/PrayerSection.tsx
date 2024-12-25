import React from 'react';
import PrayerTimes from '../PrayerTimes';
import QiblaFinder from '../QiblaFinder';
import MonthlyPrayerTimes from '../prayer/MonthlyPrayerTimes';
import PrayerSettings from '../prayer/PrayerSettings';
import PrayerTracker from '../prayer/PrayerTracker';

const PrayerSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PrayerTimes />
      <QiblaFinder />
      <MonthlyPrayerTimes />
      <PrayerSettings />
      <PrayerTracker />
    </div>
  );
};

export default PrayerSection;