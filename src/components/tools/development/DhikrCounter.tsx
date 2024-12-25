import React, { useState, useEffect } from 'react';
import { Hash } from 'lucide-react';

interface DhikrEntry {
  id: string;
  name: string;
  count: number;
  target: number;
}

const DhikrCounter = () => {
  const [entries, setEntries] = useState<DhikrEntry[]>(() => {
    const saved = localStorage.getItem('dhikrEntries');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'SubhanAllah', count: 0, target: 33 },
      { id: '2', name: 'Alhamdulillah', count: 0, target: 33 },
      { id: '3', name: 'Allahu Akbar', count: 0, target: 34 },
    ];
  });

  const [newEntry, setNewEntry] = useState({
    name: '',
    target: 33,
  });

  useEffect(() => {
    localStorage.setItem('dhikrEntries', JSON.stringify(entries));
  }, [entries]);

  const increment = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, count: entry.count + 1 } : entry
    ));
  };

  const reset = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, count: 0 } : entry
    ));
  };

  const addEntry = () => {
    if (newEntry.name.trim()) {
      setEntries([...entries, {
        id: Date.now().toString(),
        ...newEntry,
        count: 0,
      }]);
      setNewEntry({ name: '', target: 33 });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Hash className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Dhikr Counter</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              placeholder="Add new dhikr..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <input
              type="number"
              value={newEntry.target}
              onChange={(e) => setNewEntry({ ...newEntry, target: Number(e.target.value) })}
              className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Target"
            />
          </div>
          <button
            onClick={addEntry}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add Dhikr
          </button>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">{entry.name}</h3>
                <span className="text-sm text-gray-500">
                  Target: {entry.target}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => increment(entry.id)}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-2xl font-bold"
                >
                  {entry.count}
                </button>
                <button
                  onClick={() => reset(entry.id)}
                  className="px-4 py-3 text-gray-600 hover:text-red-600"
                >
                  Reset
                </button>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all"
                  style={{ width: `${Math.min((entry.count / entry.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DhikrCounter;