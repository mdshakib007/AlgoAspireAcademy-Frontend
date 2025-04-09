import React from 'react';
import Developer from '../components/HomeComponents/Developer';
import CommonButton from '../components/Common/CommonButton';
import { FaGraduationCap, FaLightbulb, FaRocket } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';

const About = () => {
    return (
        <>
            <section className="container mx-auto px-4 md:px-8 lg:px-16 mt-5">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-snug mb-10">
                    About <span className='text-glow'>AlgoAspire</span> Academy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Side: Academy Information */}
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            AlgoAspire Academy was founded with the belief that quality education should be accessible to everyone for free. We provide comprehensive coding courses, competitive programming training, and a vibrant community forum where learners can collaborate, share, and grow.
                        </p>
                        <p>
                            Our mission is to empower aspiring developers around the world by demystifying programming concepts and offering hands-on learning experiences. Through our self-paced courses and interactive community, we aim to inspire individuals to push their boundaries and achieve their fullest potential.
                        </p>
                        <p>
                            We are committed to continuous improvement. Whether you are just starting your coding journey or advancing your skills for a professional career, AlgoAspire Academy is here to support you every step of the way.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <HashLink to='/courses#'>
                                <CommonButton>Explore Courses</CommonButton>
                            </HashLink>
                            <HashLink to='/forum#'>
                                <CommonButton>Join Forum</CommonButton>
                            </HashLink>
                        </div>
                    </div>

                    {/* Right Side: Icons & Key Values */}
                    <div className="flex flex-col gap-8">
                        {/* Mission */}
                        <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-box shadow-lg text-black">
                            <FaLightbulb className="text-4xl" />
                            <div>
                                <h3 className="text-2xl font-semibold">Our Mission</h3>
                                <p>
                                    To provide free, high-quality coding education and foster a collaborative community that drives innovation and continuous learning.
                                </p>
                            </div>
                        </div>
                        {/* Vision */}
                        <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-box shadow-lg text-black">
                            <FaRocket className="text-4xl" />
                            <div>
                                <h3 className="text-2xl font-semibold">Our Vision</h3>
                                <p>
                                    To become a leading global platform for self-taught developers, inspiring millions to turn their coding dreams into reality.
                                </p>
                            </div>
                        </div>
                        {/* Values */}
                        <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-box shadow-lg text-black">
                            <FaGraduationCap className="text-6xl" />
                            <div>
                                <h3 className="text-2xl font-semibold">Our Values</h3>
                                <p>
                                    We value accessibility, innovation, and community-driven growth. Our commitment is to maintain an environment where every learner can thrive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mb-5">
                <Developer />
            </div>
        </>
    );
};

export default About;
