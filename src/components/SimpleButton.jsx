import React from 'react';

const SimpleButton = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`btn border-none text-lg bg-transparent relative overflow-hidden hover:text-yellow-500 group ${className}`}
            {...props}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
        </button>
    );
};

export default SimpleButton;