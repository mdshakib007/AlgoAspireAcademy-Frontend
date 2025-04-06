import React, { useState, useEffect, useMemo } from 'react';
import { IoSend } from "react-icons/io5";
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';

const FeatureAI = () => {
    const prompts = useMemo(() => [
        "✨ Discover the magic of AI, ask your questions!                                    ",
        " ✨ Unravel coding mysteries one query at a time!                                    ",
        " ✨ Got a challenge? Let AI illuminate the path.                                     ",
        " ✨ Curiosity is your superpower dive in now!                                        ",
        " ✨ Which course sparks your passion today?                                          ",
        " ✨ Stuck on a problem? Let's crack it together.                                     "
    ], []);

    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        const currentPrompt = prompts[currentPromptIndex];
        let charIndex = 0;
        const typingSpeed = 50;

        const typeInterval = setInterval(() => {
            setDisplayedText(prev => prev + currentPrompt[charIndex]);
            charIndex++;

            if (charIndex >= currentPrompt.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
                }, 10);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, [currentPromptIndex, prompts]);

    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 mt-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            
            {/* Left - Image + AI Input */}
            <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
                <img
                    src="ai-feature.svg"
                    alt="AI"
                    className="w-64 md:w-80 lg:w-[28rem] h-auto object-contain"
                />
                <div className="animate-slideDown w-full max-w-md">
                    <div className="flex items-center border border-gray-700 rounded-full px-4 py-2 bg-gray-800">
                        <input
                            type="text"
                            className="text-md bg-transparent flex-1 outline-none text-gray-200 placeholder-gray-400"
                            value={displayedText}
                            readOnly
                        />
                        <button
                            type="submit"
                            className="p-2 glowing-button bg-yellow-500 cursor-pointer rounded-full text-black transition hover:scale-110"
                        >
                            <IoSend size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right - Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider leading-tight">
                    <span className="text-glow">AI</span> Powered Learning!
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Gear</span> Up Your Learning Stage!<br />
                    Do not <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Fear</span> Programming Anymore!
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 my-6">
                    <Link to="/courses">
                        <CommonButton>See Courses</CommonButton>
                    </Link>
                    <a
                        href="https://youtube.com/@AlgoAspire/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <CommonButton>Ask AI</CommonButton>
                    </a>
                </div>
            </div>

        </section>
    );
};

export default FeatureAI;
