import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', animate = true }) => {
  const baseClasses = 'bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg';
  
  const content = (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
};

export default GlassCard;