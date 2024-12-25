import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Calendar as CalendarIcon } from 'lucide-react';

const MonthlyHijriView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { data: hijriData, isLoading } = useQuery(
    ['hijriCalendar', currentMonth, currentYear],
    async () => {
      const response = await fetch(
        `https://api.aladhan.com/v1/gToHCalendar/${currentMonth}/${currentYear}`
      );
      return response.json();
    }
  );

  if (isLoading || !hijriData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-800">Hijri Calendar</h2>
        </div>
        <div className="flex gap-2">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            {[...Array(10)].map((_, i) => (
              <option key={currentYear - 5 + i} value={currentYear - 5 + i}>
                {currentYear - 5 + i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {hijriData.data.map((day: any, index: number) => (
          <div
            key={index}
            className="p-2 text-center border rounded-lg hover:bg-gray-50"
          >
            <div className="text-sm text-gray-600">{day.gregorian.day}</div>
            <div className="text-xs text-emerald-600">{day.hijri.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyHijriView;