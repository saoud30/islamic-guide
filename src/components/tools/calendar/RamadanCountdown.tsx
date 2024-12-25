import React from 'react';
import { Timer } from 'lucide-react';
import { useQuery } from 'react-query';

const RamadanCountdown = () => {
  const { data: hijriDate } = useQuery('currentHijriDate', async () => {
    const response = await fetch('https://api.aladhan.com/v1/gToH');
    return response.json();
  });

  const calculateDaysToRamadan = () => {
    if (!hijriDate) return null;

    const currentMonth = parseInt(hijriDate.data.hijri.month.number);
    const currentDay = parseInt(hijriDate.data.hijri.day);
    
    // Ramadan is the 9th month
    if (currentMonth < 9) {
      const remainingDaysInCurrentMonth = 30 - currentDay;
      const monthsUntilRamadan = 9 - currentMonth;
      return remainingDaysInCurrentMonth + ((monthsUntilRamadan - 1) * 30);
    } else if (currentMonth > 9) {
      const remainingDaysInCurrentMonth = 30 - currentDay;
      const monthsUntilNextYear = 12 - currentMonth + 9;
      return remainingDaysInCurrentMonth + ((monthsUntilNextYear - 1) * 30);
    } else {
      // We're in Ramadan
      return 0;
    }
  };

  const daysToRamadan = calculateDaysToRamadan();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Timer className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Ramadan Countdown</h2>
      </div>

      <div className="text-center">
        {daysToRamadan === 0 ? (
          <div>
            <p className="text-2xl font-bold text-emerald-600 mb-2">
              Ramadan Mubarak!
            </p>
            <p className="text-gray-600">We are currently in the blessed month of Ramadan</p>
          </div>
        ) : (
          <div>
            <p className="text-4xl font-bold text-emerald-600 mb-2">
              {daysToRamadan}
            </p>
            <p className="text-gray-600">days until Ramadan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RamadanCountdown;