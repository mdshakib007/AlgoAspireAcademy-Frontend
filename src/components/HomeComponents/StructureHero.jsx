import { FaExternalLinkAlt } from 'react-icons/fa';
import CommonButton from '../Common/CommonButton';
import { HashLink } from 'react-router-hash-link';

const StructureHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-12 mt-24">

            {/* Left - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
                    The Best Course<br />
                    <span className="text-glow">Structure</span> to Learn!
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed">
                    Structure is <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Best</span> Here,<br />
                    Just Like a Bird's <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Nest!</span>
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                    <HashLink to="/courses#">
                        <CommonButton>Browse Courses</CommonButton>
                    </HashLink>
                    <a href="https://youtube.com/@AlgoAspire/" target="_blank" rel="noopener noreferrer">
                        <CommonButton>YouTube <FaExternalLinkAlt /></CommonButton>
                    </a>
                </div>
            </div>

            {/* Right - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/structure.svg"
                    alt="Course Structure"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
            </div>
        </section>
    );
};

export default StructureHero;
