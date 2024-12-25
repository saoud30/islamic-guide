import React from 'react';
import { List, AlignJustify } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'full' | 'individual';
  setViewMode: (mode: 'full' | 'individual') => void;
  isDarkMode: boolean;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode, isDarkMode }) => {
  return (
    <button
      onClick={() => setViewMode(viewMode === 'full' ? 'individual' : 'full')}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
        isDarkMode
          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {viewMode === 'full' ? (
        <>
          <List className="w-5 h-5" />
          <span className="hidden sm:inline">Individual View</span>
        </>
      ) : (
        <>
          <AlignJustify className="w-5 h-5" />
          <span className="hidden sm:inline">Full View</span>
        </>
      )}
    </button>
  );
};

export default ViewToggle;