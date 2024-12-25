import React from 'react';
import { useQuery } from 'react-query';
import { Calendar } from 'lucide-react';

const HijriCalendar = () => {
  const { data: hijriDate, isLoading } = useQuery(
    'hijriDate',
    async () => {
      const response = await fetch('https://api.aladhan.com/v1/gToH');
      return response.json();
    },
    {
      refetchInterval: 3600000, // Refetch every hour
    }
  );

  if (isLoading || !hijriDate) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Hijri Calendar</h2>
      </div>

      <div className="space-y-4">
        <div className="text-lg">
          <span className="font-arabic text-2xl">{hijriDate.data.hijri.date}</span>
        </div>
        <div className="text-gray-600">
          <p>{hijriDate.data.hijri.month.en} {hijriDate.data.hijri.year} AH</p>
          <p className="text-sm mt-2">{hijriDate.data.gregorian.date}</p>
        </div>
      </div>
    </div>
  );
};

export default HijriCalendar;