import React from 'react';

const GlowingButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-gray-900 text-white font-bold py-2 px-4 rounded-full cursor-pointer transition duration-300 glowing-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlowingButton;
