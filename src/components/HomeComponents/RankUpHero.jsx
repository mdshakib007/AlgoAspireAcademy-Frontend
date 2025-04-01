import React from 'react';
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';


const RankUpHero = () => {
    return (
        <section className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-24 px-2">
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    The <span className="text-glow"> Leaderboard </span><br /> is Awaits You!
                </h1>

                <p className="mt-4 text-lg">
                    Practice<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> More </span>to Rank You Up,<br />Don't Forget The <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Juicy</span> Events!
                </p>

                <div className='flex gap-10 my-10'>
                    <Link to='/courses'>
                        <CommonButton>Continue Learning</CommonButton>
                    </Link>
                    <Link to='/courses'>
                        <CommonButton>Explore More</CommonButton>
                    </Link>
                </div>
            </div>
            <div>
                <img src="/rank_up.svg" alt="Hero" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
            </div>
        </section>
    );
};

export default RankUpHero;