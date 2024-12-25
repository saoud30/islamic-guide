import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';

interface QuranBookmark {
  surah: number;
  ayah: number;
  timestamp: string;
  note?: string;
}

const BookmarkManager = () => {
  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('quranBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const removeBookmark = (index: number) => {
    const newBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(newBookmarks);
    localStorage.setItem('quranBookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Bookmarks</h2>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No bookmarks yet</p>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-gray-800">
                  Surah {bookmark.surah}, Ayah {bookmark.ayah}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(bookmark.timestamp).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => removeBookmark(index)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkManager;