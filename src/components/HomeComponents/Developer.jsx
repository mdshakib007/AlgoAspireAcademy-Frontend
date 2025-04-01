import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import CommonButton from '../Common/CommonButton';

const Developer = () => {
    return (
        <section className='container mx-auto flex flex-col-reverse md:flex-row justify-between items-center px-2 mt-24'>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider'>
                    <span className='text-glow'>Meet </span>The Developer & Instructor
                </h1>
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold gradient-text'>MD Shakib Ahmed</h3>
                <p className='text-gray-300'>MD Shakib Ahmed is the principal developer behind AlgoAspire-Academy and a distinguished course instructor. With the exception of a few select videos, he is responsible for the complete implementation of all course content. Currently, he excels as a remote Django backend developer while actively engaging in competitive programming: pupil on Codeforces, a 2-star coder on CodeChef, and having solved thousands of complex problems. In addition, he manages the YouTube channel @AlgoAspire, where he is committed to providing high-quality, free educational content. His unwavering belief in the power of accessible education continues to inspire learners around the world.</p>
                <a href='https://mdshakib007.vercel.app/' target='_blank' className='w-fit'>
                    <CommonButton>Portfolio <FaExternalLinkAlt /></CommonButton>
                </a>
            </div>
            <div className="w-full md:w-1/22 flex justify-center md:justify-end my-5">
                <img src="/shakib.jpeg" alt="MD Shakib Ahmed" className='max-w-72 rounded-box' />
            </div>
        </section>
    );
};

export default Developer;