import React from 'react';
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';

const RankUpHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-24">

            {/* Left - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/rank_up.svg"
                    alt="Rank Up"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
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
                    <Link to="/courses">
                        <CommonButton>Continue Learning</CommonButton>
                    </Link>
                    <Link to="/courses">
                        <CommonButton>Explore More</CommonButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RankUpHero;
