import React from 'react';
import { DollarSign } from 'lucide-react';

const FinanceGuide = () => {
  const guidelines = [
    {
      title: 'Avoid Riba (Interest)',
      description: 'Islamic finance prohibits charging or paying interest. Look for Islamic banking alternatives.',
    },
    {
      title: 'Halal Investments',
      description: 'Invest in Shariah-compliant businesses and avoid industries involving alcohol, gambling, or non-halal products.',
    },
    {
      title: 'Profit-Loss Sharing',
      description: 'Prefer business partnerships based on profit-loss sharing (Mudarabah) over interest-based loans.',
    },
    {
      title: 'Charitable Giving',
      description: 'Regular charity (Zakat and Sadaqah) purifies wealth and helps the community.',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Islamic Finance Guide</h2>
      </div>

      <div className="space-y-4">
        {guidelines.map((guideline, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="font-medium text-gray-800 mb-1">{guideline.title}</h3>
            <p className="text-sm text-gray-600">{guideline.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceGuide;