import React from 'react';
import CommonButton from '../Common/CommonButton';
import { HashLink } from 'react-router-hash-link';
import { FaRegGem } from 'react-icons/fa';
import { motion } from 'framer-motion';


const users = [
    { name: "MST. Farzana", rank: "01", remainingReason: "42 Lessons Completed", points: 2313, imageUrl: "https://img.daisyui.com/images/profile/demo/1@94.webp" },
    { name: "Abir Rahman", rank: "02", remainingReason: "Top Forum Contributor", points: 2001, imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp" },
    { name: "Angel Maria", rank: "03", remainingReason: "12k Post Views", points: 1905, imageUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp" },
];

const RankUpHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-24">

            {/* Left - Image */}
            <div className="w-full md:w-1/2 flex justify-center relative">
                
                {/* Infinite Circle Fade-in-out Animation */}
                <motion.div
                    className="absolute inset-0 bg-yellow-500 rounded-full opacity-30 h-52 w-52"
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                />
                
                <ul className="list rounded-box shadow-md w-full relative">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Monthly Top Learners</li>
                    
                    {/* Map over users to show each */}
                    {users.map((user, index) => (
                        <li key={index} className="list-row">
                            <div className="text-4xl font-thin opacity-30 tabular-nums">{user.rank}</div>
                            <div><img className="size-10 rounded-full" src={user.imageUrl} alt={user.name} /></div>
                            <div className="list-col-grow">
                                <div className="text-lg font-bold">{user.name}</div>
                                <div className="text-sm font-semibold opacity-60">{user.remainingReason}</div>
                            </div>
                            <span className="flex items-center gap-2">
                                <FaRegGem /> {user.points}
                            </span>
                        </li>
                    ))}
                    
                    {/* Display "More" button at the end */}
                    <li className="p-4 text-center">
                        <HashLink to="/leaderboard#">
                            <CommonButton>View More...</CommonButton>
                        </HashLink>
                    </li>
                </ul>
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
                    The <span className="text-glow">Leaderboard</span><br />
                    Awaits You!
                </h1>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Practice <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">More</span> to Rank You Up,<br />
                    Don't Forget The <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Juicy</span> Events!
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                    <HashLink to="/courses#">
                        <CommonButton>Continue Learning</CommonButton>
                    </HashLink>
                    <HashLink to="/courses#">
                        <CommonButton>Explore More</CommonButton>
                    </HashLink>
                </div>
            </div>
        </section>
    );
};

export default RankUpHero;
