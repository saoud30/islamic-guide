import React from 'react';
import { BookOpen, Star } from 'lucide-react';

const SalahIntroduction = () => {
  const quranVerses = [
    {
      verse: "But those who hold fast to the Book and establish prayer – indeed, We will not allow to be lost the reward of the pious.",
      reference: "Qur'an - Chapter 7, Verse 170"
    },
    {
      verse: "Recite, [O Muhammad], what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater. And Allah knows that which you do.",
      reference: "Qur'an - Chapter 29, Verse 45"
    },
    {
      verse: "And I (Allah) created not the jinns and humans except they should worship Me (Alone).",
      reference: "Qur'an - Chapter 51, Verse 56"
    },
    {
      verse: "Most surely, in the remembrance of Allah do hearts find solace.",
      reference: "Qur'an - Chapter 13, Verse 28"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-semibold text-gray-800">What is Salah and Why Do We Pray?</h2>
      </div>

      <div className="relative aspect-video mb-6">
        <img
          src="https://www.mymasjid.ca/wp-content/uploads/2016/10/why-do-we-pray.png"
          alt="Why do Muslims pray?"
          className="rounded-lg object-cover w-full"
        />
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What is Salah?</h3>
          <p className="text-gray-600">
            The salah is a special form of worship that is the second most important pillar of Islam after 
            the shahada (testimony of faith). It is an obligatory form of prayer performed five times a day 
            that was revealed in the Holy Qur'an and taught to us by Prophet Muhammad (peace be upon him).
          </p>
          
          <div className="mt-4 space-y-4">
            {quranVerses.slice(0, 2).map((verse, index) => (
              <blockquote key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                <p className="text-gray-700 italic">{verse.verse}</p>
                <footer className="text-sm text-gray-500 mt-1">{verse.reference}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why do Muslims Pray Salah?</h3>
          <p className="text-gray-600 mb-4">
            The reason why Muslims pray at all relates to what Islam considers to be the purpose of life – 
            to worship Allah alone. Shortly after Muhammad became a Prophet, the performance of salah (worship) 
            was one of the first commandments given to him by Allah.
          </p>

          <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 mb-4">
            <p className="text-gray-700 italic">{quranVerses[2].verse}</p>
            <footer className="text-sm text-gray-500 mt-1">{quranVerses[2].reference}</footer>
          </blockquote>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-gray-700 italic">
              "Between a man and polytheism and disbelief there stands his neglect of the prayer."
            </p>
            <footer className="text-sm text-gray-500 mt-1">Prophet Muhammad (peace be upon him)</footer>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Do Muslims Pray 5 Times a Day?</h3>
          <p className="text-gray-600 mb-4">
            When Muhammad (peace be upon him) became a Prophet at the age of forty one of the first things 
            he was taught was how to pray. Allah sent the angel Gabriel (Jibreel) to teach him how to make 
            wudu and perform the salah.
          </p>

          <div className="relative aspect-video mb-4">
            <img
              src="https://www.mymasjid.ca/wp-content/uploads/2016/10/Makkah_to_Jerusalem_Isra_Miraj-1.png"
              alt="Journey of Isra and Mi'raj"
              className="rounded-lg object-cover w-full"
            />
          </div>

          <blockquote className="border-l-4 border-emerald-500 pl-4 py-2">
            <p className="text-gray-700 italic">
              Exalted is He who took His Servant (Prophet Muhammad) by night from al-Masjid al-Haram 
              (In Makkah) to al-Masjid al-Aqsa (Jerusalem), whose surroundings We have blessed, to show 
              him of Our signs. Indeed, He is the Hearing, the Seeing.
            </p>
            <footer className="text-sm text-gray-500 mt-1">Qur'an - Chapter 17, Verse 1</footer>
          </blockquote>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Rewards and Benefits of Praying Salah</h3>
          
          <div className="relative aspect-video mb-4">
            <img
              src="https://www.mymasjid.ca/wp-content/uploads/2016/10/Reward-for-praying-salah-1.png"
              alt="Rewards of Salah"
              className="rounded-lg object-cover w-full"
            />
          </div>

          <p className="text-gray-600 mb-4">
            There are plenty of rewards and benefits to the prayer that were not listed in the graphic. 
            It strengthens your faith and influences you to do more good deeds. It creates strong bonds 
            of unity among the Muslims, especially when the prayer is performed as a congregation at a 
            masjid. It also serves as an excellent relief for stress and worry.
          </p>

          <blockquote className="border-l-4 border-emerald-500 pl-4 py-2">
            <p className="text-gray-700 italic">{quranVerses[3].verse}</p>
            <footer className="text-sm text-gray-500 mt-1">{quranVerses[3].reference}</footer>
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default SalahIntroduction;