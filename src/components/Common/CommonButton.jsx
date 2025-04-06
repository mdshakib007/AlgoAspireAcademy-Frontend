import React from 'react';

const CommonButton = ({
  children,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        text-black font-semibold text-base md:text-lg
        bg-gradient-to-r from-yellow-500 to-yellow-600 
        hover:from-yellow-600 hover:to-yellow-700
        focus:outline-none focus:ring-4 focus:ring-yellow-300
        transition-all duration-300 ease-in-out
        px-5 py-2.5 rounded-full shadow-md cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
