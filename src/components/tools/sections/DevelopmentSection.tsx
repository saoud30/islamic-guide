import React from 'react';
import DailyReminders from '../development/DailyReminders';
import DhikrCounter from '../development/DhikrCounter';
import DuaCollection from '../development/DuaCollection';
import FastingTracker from '../development/FastingTracker';
import GoodDeeds from '../development/GoodDeeds';

const DevelopmentSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <DailyReminders />
      <DhikrCounter />
      <DuaCollection />
      <FastingTracker />
      <GoodDeeds />
    </div>
  );
};

export default DevelopmentSection;