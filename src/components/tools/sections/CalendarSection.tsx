import React from 'react';
import HijriCalendar from '../HijriCalendar';
import MonthlyHijriView from '../calendar/MonthlyHijriView';
import IslamicEvents from '../calendar/IslamicEvents';
import RamadanCountdown from '../calendar/RamadanCountdown';
import DateConverter from '../calendar/DateConverter';

const CalendarSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <HijriCalendar />
      <MonthlyHijriView />
      <IslamicEvents />
      <RamadanCountdown />
      <DateConverter />
    </div>
  );
};

export default CalendarSection;