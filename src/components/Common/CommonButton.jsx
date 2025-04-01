import React from 'react';

const CommonButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-gray-900 text-lg md:text-xl text-white font-bold py-2 px-4 border-2 border-yellow-500 rounded-full cursor-pointer transition duration-300 common-button flex items-center gap-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
