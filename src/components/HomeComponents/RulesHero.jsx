import CommonButton from '../Common/CommonButton';
import { HashLink } from 'react-router-hash-link';

const RulesHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col-reverse md:flex-row justify-between items-center gap-12 mt-24">

            {/* left - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/thinking.svg"
                    alt="Thinking"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
            </div>

            {/* rgiht - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
                    Think <span className="text-glow">Deeply</span> <br />Before Enroll!
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed">
                    Complete <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">First</span> Course,<br />
                    To Start Learning <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Another</span> One!
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                    <HashLink to="/rules#">
                        <CommonButton>See Rules</CommonButton>
                    </HashLink>
                    <HashLink to="/courses#">
                        <CommonButton>Choose Course</CommonButton>
                    </HashLink>
                </div>
            </div>
        </section>
    );
};

export default RulesHero;
