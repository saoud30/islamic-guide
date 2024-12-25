import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  Clock,
  Calendar,
  BookOpen,
  Heart,
  Calculator,
  Settings,
} from 'lucide-react';

import PrayerSection from './tools/sections/PrayerSection';
import CalendarSection from './tools/sections/CalendarSection';
import QuranSection from './tools/sections/QuranSection';
import DevelopmentSection from './tools/sections/DevelopmentSection';
import PracticalSection from './tools/sections/PracticalSection';

const Tools = () => {
  const tabs = [
    { id: 'prayer', label: 'Prayer', icon: Clock, component: PrayerSection },
    { id: 'calendar', label: 'Calendar', icon: Calendar, component: CalendarSection },
    { id: 'quran', label: 'Quran & Hadith', icon: BookOpen, component: QuranSection },
    { id: 'development', label: 'Development', icon: Heart, component: DevelopmentSection },
    { id: 'practical', label: 'Practical', icon: Calculator, component: PracticalSection },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 mb-8">Islamic Tools</h1>

      <Tabs.Root defaultValue="prayer" className="w-full">
        <Tabs.List className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Tabs.Trigger
              key={id}
              value={id}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gold-600 border-b-2 border-transparent data-[state=active]:border-gold-600 data-[state=active]:text-gold-600"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabs.map(({ id, component: Component }) => (
          <Tabs.Content key={id} value={id} className="outline-none">
            <Component />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

export default Tools;