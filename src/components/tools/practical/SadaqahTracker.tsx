import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface SadaqahEntry {
  amount: number;
  date: string;
  category: string;
  note: string;
}

const SadaqahTracker = () => {
  const [entries, setEntries] = useState<SadaqahEntry[]>([]);
  const [newEntry, setNewEntry] = useState<SadaqahEntry>({
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: 'money',
    note: '',
  });

  useEffect(() => {
    const savedEntries = localStorage.getItem('sadaqahEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const addEntry = () => {
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('sadaqahEntries', JSON.stringify(updatedEntries));
    setNewEntry({
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: 'money',
      note: '',
    });
  };

  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Sadaqah Tracker</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={newEntry.amount}
              onChange={(e) => setNewEntry({ ...newEntry, amount: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={newEntry.category}
              onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="money">Money</option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Note</label>
            <input
              type="text"
              value={newEntry.note}
              onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Optional note..."
            />
          </div>

          <button
            onClick={addEntry}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add Entry
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600">Total Sadaqah:</span>
            <span className="font-bold text-emerald-600">${totalAmount.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            {entries.map((entry, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">
                    ${entry.amount.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">{entry.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 capitalize">{entry.category}</span>
                  {entry.note && <span className="text-gray-500">{entry.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadaqahTracker;