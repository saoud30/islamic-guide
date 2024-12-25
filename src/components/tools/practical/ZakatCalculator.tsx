import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const ZakatCalculator = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    stocks: 0,
    property: 0,
    business: 0,
  });

  const nisabThreshold = 5000; // Example threshold in USD
  const zakatRate = 0.025; // 2.5%

  const calculateTotal = () => {
    return Object.values(assets).reduce((sum, value) => sum + value, 0);
  };

  const calculateZakat = () => {
    const total = calculateTotal();
    return total >= nisabThreshold ? total * zakatRate : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Zakat Calculator</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(assets).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setAssets({ ...assets, [key]: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder={`Enter ${key} value`}
            />
          </div>
        ))}

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Total Assets:</span>
            <span className="font-medium">${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-800">Zakat Due:</span>
            <span className="font-bold text-emerald-600">
              ${calculateZakat().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;