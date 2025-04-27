import { motion } from 'framer-motion';
import React from 'react';

const MotionButton = motion.button;

const GlowingButton = ({ children, className = '', ...props }) => {
  return (
    <MotionButton
      className={`relative bg-gray-900 text-white font-bold py-2 px-4 rounded-full flex items-center gap-3 cursor-pointer transition-all duration-300 ${className}`}
      initial={{
        boxShadow: '0 0 5px rgba(250, 0, 0, 1), 0 0 10px rgba(250, 0, 0, 1)',
      }}
      animate={{
        boxShadow: [
          '0 0 10px rgba(250, 0, 0, 5), 0 0 10px rgba(250, 0, 0, 1)',
          '0 0 10px rgba(250, 197, 21, 5), 0 0 30px rgba(250, 197, 21, 1)',
          '0 0 10px rgba(250, 255, 0, 5), 0 0 40px rgba(250, 255, 0, 1)',
        ],
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 1,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default GlowingButton;
