import React from 'react';
import { Calendar, Star } from 'lucide-react';

const IslamicEvents = () => {
  const events = [
    {
      name: 'Ramadan',
      date: '23 March 2023',
      hijriDate: '1 Ramadan 1444',
      description: 'Month of fasting',
      important: true,
    },
    {
      name: 'Eid ul-Fitr',
      date: '21 April 2023',
      hijriDate: '1 Shawwal 1444',
      description: 'Festival of breaking the fast',
      important: true,
    },
    {
      name: 'Eid ul-Adha',
      date: '28 June 2023',
      hijriDate: '10 Dhul Hijjah 1444',
      description: 'Festival of sacrifice',
      important: true,
    },
    {
      name: 'Islamic New Year',
      date: '19 July 2023',
      hijriDate: '1 Muharram 1445',
      description: 'Beginning of Islamic year',
      important: false,
    },
    {
      name: 'Day of Ashura',
      date: '28 July 2023',
      hijriDate: '10 Muharram 1445',
      description: 'Day of fasting',
      important: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Islamic Events</h2>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.name}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-shrink-0">
              {event.important && (
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{event.name}</h3>
              <p className="text-sm text-emerald-600">{event.hijriDate}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslamicEvents;