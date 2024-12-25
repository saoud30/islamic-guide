import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useQuery } from 'react-query';

const DateConverter = () => {
  const [gregorianDate, setGregorianDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const { data: hijriDate, isLoading } = useQuery(
    ['hijriDate', gregorianDate],
    async () => {
      const response = await fetch(
        `https://api.aladhan.com/v1/gToH/${gregorianDate}`
      );
      const data = await response.json();
      return data;
    }
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Date Converter</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gregorian Date
          </label>
          <input
            type="date"
            value={gregorianDate}
            onChange={(e) => setGregorianDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hijri Date
          </label>
          {isLoading ? (
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          ) : hijriDate?.data?.hijri ? (
            <div className="px-3 py-2 border rounded-lg bg-gray-50">
              <p className="text-gray-800">
                {hijriDate.data.hijri.day}{' '}
                {hijriDate.data.hijri.month.en}{' '}
                {hijriDate.data.hijri.year} AH
              </p>
              <p className="text-sm text-gray-500">
                {hijriDate.data.hijri.weekday.en}
              </p>
            </div>
          ) : (
            <div className="px-3 py-2 border rounded-lg bg-gray-50">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateConverter;