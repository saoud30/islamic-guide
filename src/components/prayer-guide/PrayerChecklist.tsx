import React from 'react';
import { Check, Clock, Shirt, MapPin, Droplets } from 'lucide-react';

const PrayerChecklist = () => {
  const checklistItems = [
    {
      title: 'Make Your Wudu',
      description: 'Perform ablution before prayer.',
      icon: Droplets,
    },
    {
      title: 'Check Prayer Time',
      description: 'Each of the five daily prayers has its specified time: Fajr (dawn), Dhur (noon), Asr (afternoon), Maghrib (sunset), Isha (nightfall).',
      icon: Clock,
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wrist-watch-183143_640.jpg'
    },
    {
      title: 'Dress Appropriately',
      description: 'Men should cover from naval to knee. Women should cover their body except for face and hands.',
      icon: Shirt,
    },
    {
      title: 'Find a Clean Place',
      description: 'Ensure the prayer area is clean. You can use a prayer mat if needed.',
      icon: Check,
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/prayer-mat-for-salah.jpg'
    },
    {
      title: 'Face the Qibla',
      description: 'Face the direction of the Kaaba in Makkah.',
      icon: MapPin,
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/face-the-kabah-for-prayer.jpg'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Checklist for Getting Ready to Pray Salah
        </h2>
        <p className="text-gray-600">
          Before you stand for prayer, ensure you have completed these 5 essential requirements.
        </p>
      </div>

      <div className="grid gap-6">
        {checklistItems.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.image && (
                  <div className="relative aspect-video mt-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-emerald-50 p-4 rounded-lg">
        <p className="text-emerald-700 text-sm">
          About Times of Prayer Allah, ta^ala said: 
          <span className="font-arabic mx-2">إِنَّ الصَّلاَةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا</span>
          <span className="italic">Innas-salata kanat ^alal-mu'minina kitabam mawquta.</span>
        </p>
        <p className="text-emerald-700 text-sm mt-2">
          Ayah 103 of Suratun-Nisa' means: "Certainly, the [obligatory] prayers have been prescribed to the believers to be performed at specific times."
        </p>
      </div>
    </div>
  );
};

export default PrayerChecklist;