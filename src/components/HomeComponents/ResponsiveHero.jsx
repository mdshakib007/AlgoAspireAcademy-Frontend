import React from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../Common/CommonButton';


const ResponsiveHero = () => {
    return (
        <section className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-24 px-2">
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    Practice<span className="text-glow"> Never </span><br />Ends!
                </h1>

                <p className="mt-4 text-lg">
                    Learn<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> From </span>Any Device,<br />Learn Anytime
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Anywhere!</span></p>

                <div className='flex gap-10 my-10'>
                    <Link to='/dashboard'>
                        <CommonButton>Start Learning</CommonButton>
                    </Link>
                    <Link to='/courses'>
                        <CommonButton>Choose Course</CommonButton>
                    </Link>
                </div>
            </div>
            <div>
                <img src="/responsive.svg" alt="Hero" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
            </div>
        </section>
    );
};

export default ResponsiveHero;