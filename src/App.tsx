import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import QuranReader from './components/QuranReader';
import PrayerGuide from './components/prayer-guide/PrayerGuide';
import Tools from './components/Tools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />

          <main className="container mx-auto px-4 pt-24 pb-20 md:pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quran" element={<QuranReader />} />
              <Route path="/prayer-guide" element={<PrayerGuide />} />
              <Route path="/tools" element={<Tools />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;