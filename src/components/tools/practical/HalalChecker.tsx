import React, { useState } from 'react';
import { Search, Check, X } from 'lucide-react';

const HalalChecker = () => {
  const [ingredient, setIngredient] = useState('');
  const [result, setResult] = useState<{
    status: 'halal' | 'haram' | 'mushbooh' | null;
    details: string;
  } | null>(null);

  // Simplified database of ingredients
  const ingredients = {
    gelatin: { status: 'mushbooh', details: 'May be derived from halal or haram sources. Check certification.' },
    alcohol: { status: 'haram', details: 'Prohibited in Islam.' },
    vanilla: { status: 'halal', details: 'Natural flavoring from vanilla beans.' },
  };

  const checkIngredient = () => {
    const searchTerm = ingredient.toLowerCase();
    const found = Object.entries(ingredients).find(([key]) => 
      key.includes(searchTerm) || searchTerm.includes(key)
    );

    if (found) {
      setResult({ status: found[1].status as any, details: found[1].details });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Halal Checker</h2>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient name..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={checkIngredient}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Check
          </button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.status === 'halal' ? 'bg-green-50' :
            result.status === 'haram' ? 'bg-red-50' :
            'bg-yellow-50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {result.status === 'halal' ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : result.status === 'haram' ? (
                <X className="w-5 h-5 text-red-600" />
              ) : (
                <Search className="w-5 h-5 text-yellow-600" />
              )}
              <span className={`font-medium capitalize ${
                result.status === 'halal' ? 'text-green-800' :
                result.status === 'haram' ? 'text-red-800' :
                'text-yellow-800'
              }`}>
                {result.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{result.details}</p>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Note: This is a basic checker. Always verify with certified authorities.</p>
        </div>
      </div>
    </div>
  );
};

export default HalalChecker;