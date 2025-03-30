import React from 'react';

const FeatureCard = ({ feature }) => {
    const { icon: Icon, title, description } = feature;

    return (
        <div className='bg-gray-700 p-5 rounded-box shadow-lg shadow-black w-72 h-72 hover:scale-[101%] transition-all duration-100 hover:border border-gray-500 group'>
            <div className='text-4xl flex justify-center items-center transition-transform duration-200 group-hover:scale-125'>
                <Icon />
            </div>
            <h3 className='my-2 text-xl gradient-text'>{title}</h3>
            <p className='text-gray-300'>{description}</p>
        </div>
    );
};

export default FeatureCard;