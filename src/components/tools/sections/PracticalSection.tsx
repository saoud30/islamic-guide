import React from 'react';
import ZakatCalculator from '../practical/ZakatCalculator';
import InheritanceCalculator from '../practical/InheritanceCalculator';
import HalalChecker from '../practical/HalalChecker';
import FinanceGuide from '../practical/FinanceGuide';
import SadaqahTracker from '../practical/SadaqahTracker';

const PracticalSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ZakatCalculator />
      <InheritanceCalculator />
      <HalalChecker />
      <FinanceGuide />
      <SadaqahTracker />
    </div>
  );
};

export default PracticalSection;