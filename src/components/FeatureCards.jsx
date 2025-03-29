import React from 'react';
// import toast from 'react-hot-toast';
import { MdPlayLesson, MdQuiz } from "react-icons/md";
import { FaVideo, FaBook } from "react-icons/fa";



const FeatureCards = () => {
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

            <div className='my-10 flex flex-col justify-center items-center md:flex-row flex-wrap text-center gap-5'>
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

            <div className='text-center text-lg'>
                <h1>
                    <span className='text-3xl md:text-4xl lg:text-5xl font-bold gradient-text'>And </span>
                    Guess What...
                </h1>
                <h1>
                    Everything is
                    <span className='text-3xl md:text-4xl lg:text-5xl font-bold gradient-text'> Free!</span>
                </h1>
            </div>

        </section>
    );
};

export default FeatureCards;