import React from 'react';

interface Step {
  number: number;
  title: string;
}

interface TableOfContentsProps {
  steps: Step[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ steps }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Table of Contents</h2>
      <div className="space-y-2">
        {steps.map((step) => (
          <a
            key={step.number}
            href={`#step-${step.number}`}
            className="block text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Step {step.number} – {step.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;