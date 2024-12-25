import React from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Compass, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Book,
      title: 'Quran Reader',
      description: 'Read and listen to the Holy Quran with translations and beautiful recitations.',
      link: '/quran',
      gradient: 'from-gold-400 to-gold-200',
    },
    {
      icon: BookOpen,
      title: 'Prayer Guide',
      description: 'Learn how to pray with our comprehensive step-by-step prayer guide.',
      link: '/prayer-guide',
      gradient: 'from-gold-400 to-gold-200',
    },
    {
      icon: Compass,
      title: 'Islamic Tools',
      description: 'Access various Islamic tools including prayer times, qibla finder, and more.',
      link: '/tools',
      gradient: 'from-gold-400 to-gold-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 to-gold-400">
          Your Complete Islamic Companion
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access the Holy Quran, learn how to pray, and utilize various Islamic tools - all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="group relative overflow-hidden rounded-2xl p-8 bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <div className="flex items-center text-gold-600 group-hover:gap-2 transition-all duration-300">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-gold-50 to-gold-100/50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gold-800">Daily Inspiration</h2>
          <p className="text-gold-600">
            "Indeed, prayer has been decreed upon the believers a decree of specified times."
          </p>
          <p className="text-sm text-gold-700 mt-2">- Surah An-Nisa 4:103</p>
        </div>

        <div className="bg-gradient-to-br from-gold-50 to-gold-100/50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gold-800">Get Started</h2>
          <p className="text-gold-600 mb-4">
            Begin your journey with our comprehensive resources and tools.
          </p>
          <Link
            to="/prayer-guide"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gold-400 to-gold-300 text-white hover:from-gold-500 hover:to-gold-400 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Start Learning</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;