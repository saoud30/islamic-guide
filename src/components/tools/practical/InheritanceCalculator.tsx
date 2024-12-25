import React, { useState } from 'react';
import { Users } from 'lucide-react';

const InheritanceCalculator = () => {
  const [estate, setEstate] = useState(0);
  const [heirs, setHeirs] = useState({
    sons: 0,
    daughters: 0,
    spouse: 'none',
    parents: 'none',
  });

  const calculateShares = () => {
    // Simplified Islamic inheritance calculation
    let remaining = estate;
    const shares: Record<string, number> = {};

    // Spouse share
    if (heirs.spouse === 'husband') {
      shares.husband = estate * 0.25;
      remaining -= shares.husband;
    } else if (heirs.spouse === 'wife') {
      shares.wife = estate * 0.125;
      remaining -= shares.wife;
    }

    // Parents share
    if (heirs.parents === 'both' || heirs.parents === 'father') {
      shares.father = remaining * 0.167;
      remaining -= shares.father;
    }
    if (heirs.parents === 'both' || heirs.parents === 'mother') {
      shares.mother = remaining * 0.167;
      remaining -= shares.mother;
    }

    // Children share
    const totalChildren = heirs.sons * 2 + heirs.daughters; // Sons get double
    if (totalChildren > 0) {
      const sharePerUnit = remaining / totalChildren;
      shares.sons = heirs.sons * sharePerUnit * 2;
      shares.daughters = heirs.daughters * sharePerUnit;
    }

    return shares;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Inheritance Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Estate Value
          </label>
          <input
            type="number"
            value={estate}
            onChange={(e) => setEstate(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sons</label>
            <input
              type="number"
              value={heirs.sons}
              onChange={(e) => setHeirs({ ...heirs, sons: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Daughters</label>
            <input
              type="number"
              value={heirs.daughters}
              onChange={(e) => setHeirs({ ...heirs, daughters: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Spouse</label>
          <select
            value={heirs.spouse}
            onChange={(e) => setHeirs({ ...heirs, spouse: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="none">None</option>
            <option value="husband">Husband</option>
            <option value="wife">Wife</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Parents</label>
          <select
            value={heirs.parents}
            onChange={(e) => setHeirs({ ...heirs, parents: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="none">None</option>
            <option value="both">Both Parents</option>
            <option value="father">Father Only</option>
            <option value="mother">Mother Only</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-medium text-gray-800 mb-2">Distribution of Shares:</h3>
          <div className="space-y-2">
            {Object.entries(calculateShares()).map(([heir, amount]) => (
              <div key={heir} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{heir}:</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InheritanceCalculator;