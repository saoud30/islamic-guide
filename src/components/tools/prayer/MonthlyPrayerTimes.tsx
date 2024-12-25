import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Calendar } from 'lucide-react';

const MonthlyPrayerTimes = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const { data: monthlyPrayers, isLoading } = useQuery(
    ['monthlyPrayers', currentMonth, currentYear, location?.lat, location?.lon],
    async () => {
      if (!location) throw new Error('Location not available');
      const response = await fetch(
        `https://api.aladhan.com/v1/calendar/${currentYear}/${currentMonth}?latitude=${location.lat}&longitude=${location.lon}&method=2`
      );
      return response.json();
    },
    {
      enabled: !!location,
    }
  );

  if (isLoading || !monthlyPrayers) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Monthly Prayer Times</h2>
      </div>

      <div className="overflow-auto max-h-96">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fajr</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dhuhr</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asr</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maghrib</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isha</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlyPrayers.data.map((day: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{day.date.readable}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{day.timings.Fajr}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{day.timings.Dhuhr}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{day.timings.Asr}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{day.timings.Maghrib}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{day.timings.Isha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyPrayerTimes;