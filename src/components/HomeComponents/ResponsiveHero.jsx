import React from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../Common/CommonButton';

const ResponsiveHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-12 mt-24">

            {/* Left - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
                    Practice <span className="text-glow">Never</span> <br />Ends!
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed">
                    Learn <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">From</span> Any Device,<br />
                    Learn Anytime <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Anywhere!</span>
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                    <Link to="/dashboard">
                        <CommonButton>Start Learning</CommonButton>
                    </Link>
                    <Link to="/courses">
                        <CommonButton>Choose Course</CommonButton>
                    </Link>
                </div>
            </div>

            {/* Right - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/responsive.svg"
                    alt="Responsive"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
            </div>
        </section>
    );
};

export default ResponsiveHero;
