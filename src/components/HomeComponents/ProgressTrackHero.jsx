import CommonButton from '../Common/CommonButton';
import { HashLink } from 'react-router-hash-link';

const ProgressTrackHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-24">

            {/* Left - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/progress_tracking.svg"
                    alt="Progress Tracking"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
                    Track Your <span className="text-glow">Progress</span><br />
                    & All Activity!
                </h1>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Every <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Single</span> Activity is Tracked,<br />
                    See Your <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Progress</span> Everyday!
                </p>

                <div className="mt-6 w-fit mx-auto md:mx-0">
                    <HashLink to="/courses#">
                        <CommonButton>Enroll Now!</CommonButton>
                    </HashLink>
                </div>
            </div>
        </section>
    );
};

export default ProgressTrackHero;
