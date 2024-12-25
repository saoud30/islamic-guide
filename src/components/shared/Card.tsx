import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', animate = true }) => {
  const content = (
    <div className={`card ${className}`}>
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

export default Card;