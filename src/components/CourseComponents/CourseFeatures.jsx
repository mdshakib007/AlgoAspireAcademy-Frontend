import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import GlowingButton from '../Common/GlowingButton';
import features from '../../data/features';
import FeatureCard from '../HomeComponents/FeatureCard';
import { Link } from 'react-router-dom';


const CourseFeatures = ({ i_enrolled, enrollNow }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div>
            <h1 className='text-center text-4xl mt-24 font-bold gradient-text' id='features'>All Features</h1>
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
                        {
                            i_enrolled ? <Link to='/dashboard'>
                                <GlowingButton>
                                    Continue Learning
                                </GlowingButton>
                            </Link> : <GlowingButton onClick={enrollNow}>Enroll Now!</GlowingButton>
                        }
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CourseFeatures;