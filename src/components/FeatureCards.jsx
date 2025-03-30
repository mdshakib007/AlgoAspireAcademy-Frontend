import React from 'react';
import { useState, useContext } from 'react';
import { motion } from "framer-motion";
import { MdPlayLesson, MdQuiz } from "react-icons/md";
import { FaVideo, FaBook } from "react-icons/fa";
import GlowingButton from './GlowingButton';
import features from '../data/features';
import FeatureCard from './FeatureCard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const FeatureCards = () => {
    const [hovered, setHovered] = useState(false);
    const { user } = useContext(AuthContext);

    return (
        <section className="container mx-auto px-2 mt-24">
            <div className='text-center text-lg'>
                <h1>
                    The
                    <span className='text-3xl md:text-4xl lg:text-5xl font-bold gradient-text'> Hotness </span>
                    is Just Begun!
                </h1>
                <h1>
                    Scroll Down
                    <span className='text-3xl md:text-4xl lg:text-5xl font-bold gradient-text'> Bro!</span>
                </h1>
            </div>

            <div className='my-10 flex flex-row justify-center items-center flex-wrap text-center gap-5'>
                <div className='bg-gray-700 p-5 rounded-box shadow-lg shadow-black w-42 h-42 hover:scale-105 transition-all duration-100 hover:border border-gray-500'>
                    <h1 className='flex flex-col justify-center items-center text-5xl font-bold gap-2'>
                        <MdPlayLesson />
                        21+
                    </h1>
                    <p className='text-gray-300 text-lg '>Lessons</p>
                </div>
                <div className='bg-gray-700 p-5 rounded-box shadow-lg shadow-black w-42 h-42 hover:scale-105 transition-all duration-100 hover:border border-gray-500'>
                    <h1 className='flex flex-col justify-center items-center text-5xl font-bold gap-2'>
                        <MdQuiz />
                        234+
                    </h1>
                    <p className='text-gray-300 text-lg '>Quizes</p>
                </div>
                <div className='bg-gray-700 p-5 rounded-box shadow-lg shadow-black w-42 h-42 hover:scale-105 transition-all duration-100 hover:border border-gray-500'>
                    <h1 className='flex flex-col justify-center items-center text-5xl font-bold gap-2'>
                        <FaBook />
                        523+
                    </h1>
                    <p className='text-gray-300 text-lg '>Assignments</p>
                </div>
                <div className='bg-gray-700 p-5 rounded-box shadow-lg shadow-black w-42 h-42 hover:scale-105 transition-all duration-100 hover:border border-gray-500'>
                    <h1 className='flex flex-col justify-center items-center text-5xl font-bold gap-2'>
                        <FaVideo />
                        34+
                    </h1>
                    <p className='text-gray-300 text-lg '>Video Lectures</p>
                </div>
            </div>

            <div className='my-10 flex justify-center items-center flex-row flex-wrap text-center gap-5'>
                {
                    features.map(feature => (
                        <FeatureCard key={feature.id} feature={feature}></FeatureCard>
                    ))
                }
                <div
                    className="relative w-72 h-72 flex items-center justify-center"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Front Card */}
                    <motion.div
                        className="absolute w-full h-full text-lg bg-gray-700 p-5 rounded-box shadow-lg shadow-black flex flex-col items-center justify-center cursor-pointer"
                        animate={hovered ? { rotateX: 90, opacity: 0 } : { rotateX: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <h1>
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">And </span>
                            Guess What...
                        </h1>
                        <h1>
                            Everything is
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Free!</span>
                        </h1>
                    </motion.div>

                    {/* Back Card */}
                    <motion.div
                        className="absolute w-full h-full bg-gray-800 p-5 rounded-box shadow-lg shadow-black flex flex-col items-center justify-center"
                        animate={hovered ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <h1 className="text-xl font-bold text-white mb-4">Want to Start?</h1>
                        <Link to='/dashboard'>
                            <GlowingButton>
                                {user ? 'Dashboard' : 'Get Started'}
                            </GlowingButton>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;