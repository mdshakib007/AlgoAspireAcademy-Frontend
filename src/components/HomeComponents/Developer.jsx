import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import CommonButton from '../Common/CommonButton';
import { motion } from 'framer-motion';

const Developer = () => {
    return (
        <section className='container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-4 md:px-8 lg:px-16 mt-24'>
            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-snug'>
                    <span className='text-glow'>Meet </span>The Developer & Instructor
                </h1>
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold gradient-text'>
                    MD Shakib Ahmed
                </h3>
                <p className='text-gray-300 text-base md:text-lg leading-relaxed'>
                    MD Shakib Ahmed is the principal developer behind AlgoAspire-Academy and a distinguished course instructor. With the exception of a few select videos, he is responsible for the complete implementation of all course content. Currently, he excels as a remote Django backend developer while actively engaging in competitive programming: pupil on Codeforces, a 2-star coder on CodeChef, and having solved thousands of complex problems. In addition, he manages the YouTube channel <a href='https://youtube.com/@AlgoAspire/' target='_blank' className='underline text-yellow-500'>@AlgoAspire</a>, where he is committed to providing high-quality, free educational content. His unwavering belief in the power of accessible education continues to inspire learners around the world.
                </p>
                <div className='flex justify-center md:justify-start'>
                    <a
                        href='https://mdshakib007.vercel.app/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-fit'
                    >
                        <CommonButton>
                            Portfolio <FaExternalLinkAlt />
                        </CommonButton>
                    </a>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <motion.img
                    src="/shakib.jpeg"
                    alt="MD Shakib Ahmed"
                    className='w-64 md:w-80 lg:w-96 rounded-box shadow-lg object-cover'
                    initial={{ opacity: 0, x: -200, y: -200 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 25,
                        delay: 0.3
                    }}
                />
            </div>
        </section>
    );
};

export default Developer;
