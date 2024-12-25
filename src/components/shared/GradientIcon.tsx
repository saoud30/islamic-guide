import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientIconProps {
  icon: LucideIcon;
  gradient: string;
  className?: string;
}

const GradientIcon: React.FC<GradientIconProps> = ({ icon: Icon, gradient, className = '' }) => {
  return (
    <div 
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} 
        flex items-center justify-center text-white shadow-lg 
        group-hover:scale-110 transition-transform duration-300 ${className}`}
    >
      <Icon className="w-6 h-6" />
    </div>
  );
};

export default GradientIcon;