import { motion } from 'framer-motion';
import CommonButton from '../Common/CommonButton';
import { HashLink } from 'react-router-hash-link';

const ProgressTrackHero = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-24">

            {/* Left - Dashboard Stats (Progress Tracker) */}
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">

                    {/* Linear Progress Bar with Infinite Animation */}
                    <div className="stat">
                        <div className="stat-title">Progress: Enroll a Course</div>
                        <div className="stat-value">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
                                className="bg-yellow-500 h-2 rounded-full"
                            />
                        </div>
                        <div className="stat-desc">Course Enrollment Complete</div>
                    </div>

                    {/* Circular Progress with Infinite Animation */}
                    <div className="stat">
                        <div className="stat-title">Course Progress</div>
                        <div className="stat-value">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 2}}
                                className="relative flex justify-center items-center w-20 h-20 rounded-full border-4 border-yellow-500"
                            >
                                <div className="absolute inset-0 flex justify-center items-center font-semibold text-xl">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        75%
                                    </motion.span>
                                </div>
                                <svg
                                    className="absolute inset-0 w-full h-full rotate-90"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 36 36"
                                    stroke="currentColor"
                                >
                                    <path
                                        className="text-gray-300"
                                        fill="none"
                                        strokeWidth="3"
                                        d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831"
                                    ></path>
                                    <path
                                        className="text-yellow-500"
                                        fill="none"
                                        strokeWidth="3"
                                        strokeDasharray="75, 100"
                                        d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831"
                                    ></path>
                                </svg>
                            </motion.div>
                        </div>
                        <div className="stat-desc">Completed Lessons</div>
                    </div>

                    {/* Stats Example */}
                    <div className="stat">
                        <div className="stat-title">Step 1: Enroll</div>
                        <div className="stat-value">0%</div>
                        <div className="stat-desc">Enroll in a course</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Step 2: Start Learning</div>
                        <div className="stat-value">25%</div>
                        <div className="stat-desc">Begin your lessons</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Step 3: Complete a Lesson</div>
                        <div className="stat-value">50%</div>
                        <div className="stat-desc">Finish one lesson</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Step 4: Finish a Module</div>
                        <div className="stat-value">75%</div>
                        <div className="stat-desc">Complete a module</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Step 5: Finish the Course</div>
                        <div className="stat-value">100%</div>
                        <div className="stat-desc">Complete the entire course</div>
                    </div>

                </div>
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
