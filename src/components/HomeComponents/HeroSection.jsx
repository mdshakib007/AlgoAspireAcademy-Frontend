import { FaExternalLinkAlt } from 'react-icons/fa';
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Left - Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
                    Aspiring Mind<br />
                    Infinite <span className="text-glow">Code!</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Everything is <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">100%</span> free here!<br />
                    Learn programming for
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Free </span>
                    with quality content!
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                    <Link to="/courses">
                        <CommonButton>Browse Courses</CommonButton>
                    </Link>
                    <a href="https://youtube.com/@AlgoAspire/" target="_blank" rel="noopener noreferrer">
                        <CommonButton>YouTube <FaExternalLinkAlt className="ml-2" /></CommonButton>
                    </a>
                </div>
            </div>

            {/* Right - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/learning-sketch.svg"
                    alt="Hero"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
            </div>
        </section>
    );
};

export default HeroSection;
