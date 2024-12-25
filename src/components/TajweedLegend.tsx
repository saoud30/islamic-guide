import React from 'react';
import { getTajweedRules } from '../utils/tajweedParser';
import { Info } from 'lucide-react';

interface TajweedLegendProps {
  isDarkMode: boolean;
}

const TajweedLegend: React.FC<TajweedLegendProps> = ({ isDarkMode }) => {
  const rules = getTajweedRules();

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-xl shadow-lg mb-8`}>
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-emerald-600" />
        <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Tajweed Guide
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.identifier}
            className={`flex items-center gap-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: rule.color }}
            />
            <span className="text-sm">{rule.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TajweedLegend;