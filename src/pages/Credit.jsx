import React from 'react';
import credits from '../data/credits';

const Credit = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 text-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Credits & Acknowledgments
            </h1>
            <p className="text-center mb-6 text-gray-300 max-w-2xl mx-auto">
                This project would not have been possible without the contributions and inspiration from the following tools, libraries, and communities:
            </p>
            <ul className="space-y-4 list-disc list-inside text-lg text-gray-300">
                {credits.map((credit, index) => (
                    <li key={index}>
                        <span className='font-bold'>{credit.title}: </span>
                        <a
                            href={credit.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-500 hover:underline"
                        >  {credit.link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Credit;
