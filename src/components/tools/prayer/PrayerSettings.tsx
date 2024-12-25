import React, { useState } from 'react';
import { Settings, Volume2, Bell } from 'lucide-react';

const PrayerSettings = () => {
  const [adhanSettings, setAdhanSettings] = useState({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    volume: 70,
    notifications: true,
  });

  const handleToggle = (prayer: keyof typeof adhanSettings) => {
    setAdhanSettings(prev => ({
      ...prev,
      [prayer]: !prev[prayer]
    }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdhanSettings(prev => ({
      ...prev,
      volume: parseInt(e.target.value)
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Prayer Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Adhan Alerts</h3>
          {Object.entries(adhanSettings)
            .filter(([key]) => typeof adhanSettings[key as keyof typeof adhanSettings] === 'boolean' && key !== 'notifications')
            .map(([prayer, enabled]) => (
              <div key={prayer} className="flex items-center justify-between py-2">
                <span className="text-gray-600 capitalize">{prayer}</span>
                <button
                  onClick={() => handleToggle(prayer as keyof typeof adhanSettings)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-700">Volume</h3>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={adhanSettings.volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-right text-sm text-gray-600">{adhanSettings.volume}%</div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Notifications</span>
          </div>
          <button
            onClick={() => handleToggle('notifications')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              adhanSettings.notifications ? 'bg-emerald-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                adhanSettings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerSettings;