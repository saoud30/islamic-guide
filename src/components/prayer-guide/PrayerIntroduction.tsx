import React from 'react';

const PrayerIntroduction = () => {
  const prayers = [
    { name: 'Fajr', units: 2 },
    { name: 'Dhur', units: 4 },
    { name: 'Asr', units: 4 },
    { name: 'Maghrib', units: 3 },
    { name: 'Isha', units: 4 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started with Prayer</h2>
      
      <div className="space-y-6">
        <p className="text-gray-600">
          After making proper wudu, we can begin to pray salah. The prayer consists of specific steps
          performed in sequence, forming units called rakah.
        </p>

        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-semibold text-emerald-700 mb-2">Basic Components of Each Rakah:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Standing position (Qiyam)</li>
            <li>Quran recitation</li>
            <li>Bowing (Ruku)</li>
            <li>Prostration (Sujud)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Prayer Units (Rakah) by Prayer Time:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {prayers.map((prayer) => (
              <div key={prayer.name} className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-medium text-gray-800">{prayer.name}</h4>
                <p className="text-emerald-600">{prayer.units} rakah</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerIntroduction;