import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface Reminder {
  id: string;
  text: string;
  time: string;
  enabled: boolean;
}

const DailyReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('islamicReminders');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: 'Read morning adhkar', time: '06:00', enabled: true },
      { id: '2', text: 'Read evening adhkar', time: '18:00', enabled: true },
      { id: '3', text: 'Read Surah Al-Kahf', time: '10:00', enabled: true, day: 'Friday' },
    ];
  });

  const [newReminder, setNewReminder] = useState({
    text: '',
    time: '12:00',
  });

  useEffect(() => {
    localStorage.setItem('islamicReminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (newReminder.text.trim()) {
      setReminders([...reminders, {
        id: Date.now().toString(),
        ...newReminder,
        enabled: true,
      }]);
      setNewReminder({ text: '', time: '12:00' });
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Daily Reminders</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newReminder.text}
              onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
              placeholder="Add new reminder..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={addReminder}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add Reminder
          </button>
        </div>

        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-5 h-5 rounded-full border-2 ${
                    reminder.enabled
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-gray-300'
                  }`}
                >
                  {reminder.enabled && (
                    <span className="text-white flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
                <div>
                  <p className={`font-medium ${
                    reminder.enabled ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {reminder.text}
                  </p>
                  <p className="text-sm text-gray-500">{reminder.time}</p>
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyReminders;