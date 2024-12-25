import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface GoodDeed {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  date: string;
}

const GoodDeeds = () => {
  const [deeds, setDeeds] = useState<GoodDeed[]>(() => {
    const saved = localStorage.getItem('goodDeeds');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: 'Help someone in need', completed: false, category: 'charity', date: new Date().toISOString() },
      { id: '2', text: 'Visit a sick person', completed: false, category: 'social', date: new Date().toISOString() },
      { id: '3', text: 'Share Islamic knowledge', completed: false, category: 'dawah', date: new Date().toISOString() },
    ];
  });

  const [newDeed, setNewDeed] = useState({
    text: '',
    category: 'general',
  });

  useEffect(() => {
    localStorage.setItem('goodDeeds', JSON.stringify(deeds));
  }, [deeds]);

  const addDeed = () => {
    if (newDeed.text.trim()) {
      setDeeds([...deeds, {
        id: Date.now().toString(),
        text: newDeed.text,
        completed: false,
        category: newDeed.category,
        date: new Date().toISOString(),
      }]);
      setNewDeed({ text: '', category: 'general' });
    }
  };

  const toggleDeed = (id: string) => {
    setDeeds(deeds.map(deed =>
      deed.id === id ? { ...deed, completed: !deed.completed } : deed
    ));
  };

  const deleteDeed = (id: string) => {
    setDeeds(deeds.filter(deed => deed.id !== id));
  };

  const categories = ['general', 'charity', 'social', 'dawah', 'worship'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Good Deeds</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newDeed.text}
              onChange={(e) => setNewDeed({ ...newDeed, text: e.target.value })}
              placeholder="Add new good deed..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <select
              value={newDeed.category}
              onChange={(e) => setNewDeed({ ...newDeed, category: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addDeed}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add Deed
          </button>
        </div>

        <div className="space-y-3">
          {deeds.map((deed) => (
            <div
              key={deed.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDeed(deed.id)}
                  className={`w-5 h-5 rounded-full border-2 ${
                    deed.completed
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-gray-300'
                  }`}
                >
                  {deed.completed && (
                    <span className="text-white flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
                <div>
                  <p className={`font-medium ${
                    deed.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                  }`}>
                    {deed.text}
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="text-emerald-600 capitalize">
                      {deed.category}
                    </span>
                    <span className="text-gray-500">
                      {new Date(deed.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteDeed(deed.id)}
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

export default GoodDeeds;