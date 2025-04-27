import { FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
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
            <div className="w-full md:w-1/2 flex md:justify-center">
                <ul className="timeline timeline-vertical">
                    {[
                        "Enroll a course",
                        "Go to `Start Learning`",
                        "Complete a lesson",
                        "Finish a module",
                        "Complete the course!",
                        "Go to `Step 1`"
                    ].map((step, index) => (
                        <li key={index} className="group mb-5 cursor-context-menu">
                            <div className="timeline-start font-bold text-gray-300">
                                Step {index + 1}
                            </div>
                            <div className="timeline-middle bg-gray-500 p-1 rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:bg-yellow-500">
                                <FaCheck className="text-black" />
                            </div>
                            <div className="timeline-end timeline-box bg-gray-800 border border-gray-600 text-gray-200 text-sm font-semibold shadow-md transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">
                                {step}
                            </div>
                            {index !== 4 && <hr className="border-gray-600 transition-colors duration-500 group-hover:border-yellow-500" />}
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
};

export default StructureHero;
