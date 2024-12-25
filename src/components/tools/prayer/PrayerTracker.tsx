import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface Prayer {
  name: string;
  time: string;
  completed: boolean;
  missed: boolean;
}

const PrayerTracker = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([
    { name: 'Fajr', time: '05:30', completed: false, missed: false },
    { name: 'Dhuhr', time: '13:15', completed: false, missed: false },
    { name: 'Asr', time: '16:45', completed: false, missed: false },
    { name: 'Maghrib', time: '19:30', completed: false, missed: false },
    { name: 'Isha', time: '21:00', completed: false, missed: false },
  ]);

  const handlePrayerStatus = (index: number, status: 'completed' | 'missed') => {
    setPrayers(prev => prev.map((prayer, i) => {
      if (i === index) {
        return {
          ...prayer,
          completed: status === 'completed',
          missed: status === 'missed'
        };
      }
      return prayer;
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Prayer Tracker</h2>
      </div>

      <div className="space-y-4">
        {prayers.map((prayer, index) => (
          <div key={prayer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800">{prayer.name}</h3>
                <p className="text-sm text-gray-500">{prayer.time}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePrayerStatus(index, 'completed')}
                className={`px-3 py-1 rounded-full text-sm ${
                  prayer.completed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => handlePrayerStatus(index, 'missed')}
                className={`px-3 py-1 rounded-full text-sm ${
                  prayer.missed
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                Missed
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Completed today:</span>
          <span className="font-medium text-emerald-600">
            {prayers.filter(p => p.completed).length}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrayerTracker;