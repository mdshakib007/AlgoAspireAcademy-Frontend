import { FaExternalLinkAlt } from 'react-icons/fa';
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';


const HeroSection = () => {
    return (
        <section className="container mx-auto flex flex-col md:flex-row justify-between items-center px-2">
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    Aspiring Mind<br />
                    Infinite <span className="text-glow">Code!</span>
                </h1>

                <p className="mt-4 text-lg">
                    Everything is <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">100%</span> free here!<br />Learn programming for
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Free </span>
                    with quality content!
                </p>

                <div className='flex gap-10 my-10'>
                    <Link to='/courses'>
                        <CommonButton>Browse Courses</CommonButton>
                    </Link>
                    <a href='https://youtube.com/@AlgoAspire/' target='_blank'>
                        <CommonButton>YouTube <FaExternalLinkAlt /></CommonButton>
                    </a>
                </div>
            </div>
            <div>
                <img src="/learning-sketch.svg" alt="Hero" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
            </div>
        </section>
    );
};

export default HeroSection;
