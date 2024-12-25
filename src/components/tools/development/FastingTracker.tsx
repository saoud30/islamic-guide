import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface FastDay {
  date: string;
  type: 'mandatory' | 'voluntary';
  completed: boolean;
}

const FastingTracker = () => {
  const [fastDays, setFastDays] = useState<FastDay[]>(() => {
    const saved = localStorage.getItem('fastingDays');
    return saved ? JSON.parse(saved) : [];
  });

  const [newFast, setNewFast] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'voluntary' as const,
  });

  useEffect(() => {
    localStorage.setItem('fastingDays', JSON.stringify(fastDays));
  }, [fastDays]);

  const addFastDay = () => {
    if (!fastDays.some(day => day.date === newFast.date)) {
      setFastDays([...fastDays, { ...newFast, completed: false }]);
      setNewFast({
        date: new Date().toISOString().split('T')[0],
        type: 'voluntary',
      });
    }
  };

  const toggleCompletion = (date: string) => {
    setFastDays(fastDays.map(day =>
      day.date === date ? { ...day, completed: !day.completed } : day
    ));
  };

  const removeFastDay = (date: string) => {
    setFastDays(fastDays.filter(day => day.date !== date));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Fasting Tracker</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="date"
              value={newFast.date}
              onChange={(e) => setNewFast({ ...newFast, date: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <select
              value={newFast.type}
              onChange={(e) => setNewFast({ ...newFast, type: e.target.value as 'mandatory' | 'voluntary' })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="voluntary">Voluntary</option>
              <option value="mandatory">Mandatory</option>
            </select>
          </div>
          <button
            onClick={addFastDay}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add Fast Day
          </button>
        </div>

        <div className="space-y-3">
          {fastDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleCompletion(day.date)}
                  className={`w-5 h-5 rounded-full border-2 ${
                    day.completed
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-gray-300'
                  }`}
                >
                  {day.completed && (
                    <span className="text-white flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
                <div>
                  <p className="font-medium text-gray-800">
                    {new Date(day.date).toLocaleDateString()}
                  </p>
                  <p className={`text-sm ${
                    day.type === 'mandatory' ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {day.type.charAt(0).toUpperCase() + day.type.slice(1)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFastDay(day.date)}
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

export default FastingTracker;