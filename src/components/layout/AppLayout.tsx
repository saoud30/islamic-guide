import React from 'react';
import Navigation from '../Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-20 md:pb-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;