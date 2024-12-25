import React from 'react';
import { Droplets, AlertCircle } from 'lucide-react';

interface WuduStep {
  number: number;
  title: string;
  description: string;
  image?: string;
  times?: number;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
}

const WuduGuide = () => {
  const wuduSteps: WuduStep[] = [
    {
      number: 1,
      title: 'Make your intention to perform wudu',
      description: 'The first step is to understand that you are about to begin the process of wudu so that you can perform salah. There are no words or special statements that need to be said here. Creating the intention is a matter of the heart and mind.',
      times: 1
    },
    {
      number: 2,
      title: 'Say Bismillah',
      description: 'This is a critical part of making wudu. Before we begin to our wash ourselves we need to say Bismillah (In the Name of Allah). You can say it silently to yourself.',
      times: 1
    },
    {
      number: 3,
      title: 'Wash Your Hands Three Times',
      description: 'Prophet Muhammad (peace be upon him) taught us to begin with our right side first. That means you will need to wash your right hand from the fingertips to the wrist three times. Make sure water touches every part of the hand. Afterwards perform the same actions with your left hand three times.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-wash-hands.png',
      times: 3
    },
    {
      number: 4,
      title: 'Rinse Your Mouth Three Times',
      description: 'Take some water into your right hand and rinse your mouth three times. Do this thoroughly to clean your mouth properly.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-rinse-mouth.png',
      times: 3
    },
    {
      number: 5,
      title: 'Sniff Water Into Your Nostrils Three Times',
      description: 'Take some water in your right hand and sniff it into your nose. We used the word "sniff" here to give you an idea of what this means. You will need to snort or inhale the water into your nose and then blow it out, three times. Try not to take in too much water or you may hurt yourself.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-into-nose.png',
      times: 3
    },
    {
      number: 6,
      title: 'Wash Your Face Three Times',
      description: 'Every part of the face needs to be washed. That means from ear to ear and from the top of your forehead to the bottom of your chin. Do this step three times. For men who have beards take your wet hands and pass them through your beard as you wash your face.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-wash-face.png',
      times: 3
    },
    {
      number: 7,
      title: 'Wash Your Arms Three Times',
      description: 'Start from the fingertips and wash your right arm up to the elbow three times. Make sure that no part is left dry. Afterwards, follow the same process for your left arm and do it three times.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-wash-arms.png',
      times: 3
    },
    {
      number: 8,
      title: 'Wipe Your Head Once',
      description: 'Move your wet hands from the top of the forehead to the back of the head, and then from the back of the head to the forehead. This is done only once. It doesn\'t matter what type of hair you have. Whether you are bald, have short hair or long hair, the process is the same.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-wash-hair.png',
      times: 1
    },
    {
      number: 9,
      title: 'Clean Your Ears Once',
      description: 'This step should be performed with the same water from step 8. Using your wet hands you will use your index fingers to clean the inside of your ears and your thumb to clean the area behind your ears. This is done only once.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-clean-ears.png',
      times: 1
    },
    {
      number: 10,
      title: 'Wash Your Feet Three Times',
      description: 'Begin from your toes on your right foot and wash up to and including your ankle. Make sure water touches every area of the right foot, especially between the toes and the back of the ankle. Do this three times with the right foot followed by three times with the left foot.',
      image: 'https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-wash-feet.png',
      times: 3
    },
    {
      number: 11,
      title: 'Recite the Shahada and the Dua',
      description: 'When the Prophet (peace be upon him) would complete his wudu he would say the shahada.',
      arabicText: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      transliteration: 'Ash-hadu an la ilaha illal lahu wa ash-hadu anna Muhammadan \'abduhu wa rasuluh',
      translation: 'I testify that there is no god but Allah, and I also testify that Muhammad is His servant and messenger',
      times: 1
    }
  ];

  const nullifiers = [
    'Anything that is a natural discharge (urine, stool, or passing gas)',
    'Falling asleep',
    'Becoming unconscious',
    'Ejaculation'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-semibold text-gray-800">How to Make Wudu</h2>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-gray-600">
            Before we can perform salah we need to prepare ourselves mentally, physically, and spiritually. 
            A large portion of this preparation is what is known as wudu. It is a purification process that 
            every Muslim must perform before their prayer can be performed.
          </p>

          <blockquote className="border-l-4 border-emerald-500 pl-4 my-4">
            <p className="text-gray-700 italic">
              "No salah is accepted without wudu (purification)"
            </p>
            <footer className="text-sm text-gray-500">
              Sahih Muslim, Book 2, Hadith 2
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="space-y-8">
        {wuduSteps.map((step) => (
          <div key={step.number} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Step {step.number} - {step.title}
              {step.times > 1 && (
                <span className="ml-2 text-sm text-emerald-600">
                  (Repeat {step.times} times)
                </span>
              )}
            </h3>
            
            <p className="text-gray-600 mb-4">{step.description}</p>

            {step.image && (
              <div className="relative aspect-video mt-4 mb-4">
                <img
                  src={step.image}
                  alt={`Step ${step.number}: ${step.title}`}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}

            {(step.arabicText || step.transliteration || step.translation) && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {step.arabicText && (
                  <p className="text-xl font-arabic text-right">{step.arabicText}</p>
                )}
                {step.transliteration && (
                  <p className="text-sm text-gray-600 italic">{step.transliteration}</p>
                )}
                {step.translation && (
                  <p className="text-sm text-emerald-600">{step.translation}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-medium text-gray-800">What Nullifies Your Wudu?</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Your wudu remains valid until one or more of the following occurs:
        </p>
        
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {nullifiers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Making Wudu While Wearing Socks or Shoes
        </h3>
        
        <p className="text-gray-600 mb-4">
          If you decide to put on your socks while you have wudu on, then if a time comes for you to 
          redo your wudu then you do not need to take off your socks.
        </p>

        <div className="relative aspect-video mb-4">
          <img
            src="https://www.mymasjid.ca/wp-content/uploads/2016/10/wudu-wipe-socks.png"
            alt="Wiping over socks during wudu"
            className="rounded-lg object-cover w-full"
          />
        </div>

        <p className="text-gray-600">
          This is what Prophet Muhammad (peace be upon him) used to do when he made wudu with his 
          socks on. Although we were referring to socks in this section, the same rules apply for 
          shoes and sandals as long as they cover up to the ankles.
        </p>
      </div>
    </div>
  );
};

export default WuduGuide;