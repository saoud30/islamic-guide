import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Clock, MapPin } from 'lucide-react';
import type { PrayerTimesResponse } from '../../types/prayer';

const PrayerTimes = () => {
  // Set Delhi's coordinates
  const location = {
    lat: 28.6139,
    lon: 77.2090
  };

  const { data: prayerTimes, isLoading } = useQuery<PrayerTimesResponse>(
    ['prayerTimes'],
    async () => {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${new Date().toISOString().split('T')[0]}?latitude=${location.lat}&longitude=${location.lon}&method=3&school=1`
      );
      return response.json();
    },
    {
      refetchInterval: 60000, // Refetch every minute
    }
  );

  // Rest of the component remains the same
  if (isLoading || !prayerTimes) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const prayerNames = {
    Fajr: 'Fajr',
    Sunrise: 'Sunrise',
    Dhuhr: 'Dhuhr',
    Asr: 'Asr',
    Maghrib: 'Maghrib',
    Isha: 'Isha',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-gold-600" />
        <h2 className="text-xl font-semibold text-gray-800">Prayer Times</h2>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <MapPin className="w-4 h-4" />
        <span>Delhi, India</span>
      </div>

      <div className="space-y-4">
        {Object.entries(prayerNames).map(([key, name]) => (
          <div
            key={key}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-700">{name}</span>
            <span className="font-semibold text-gold-600">
              {prayerTimes.data.timings[key as keyof typeof prayerNames]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Date: {prayerTimes.data.date.readable}</p>
        <p>Hijri: {prayerTimes.data.date.hijri.date}</p>
      </div>
    </div>
  );
};

export default PrayerTimes;