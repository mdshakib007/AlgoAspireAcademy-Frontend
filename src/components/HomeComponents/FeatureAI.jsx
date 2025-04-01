import React, { useState, useEffect, useMemo } from 'react';
import { IoSend } from "react-icons/io5";
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';

const FeatureAI = () => {
    // Wrap the prompts array in useMemo so that it doesn't change on every render
    const prompts = useMemo(() => [
        "✨ Discover the magic of AI, ask your questions!                                    ",
        " ✨ Unravel coding mysteries one query at a time!                                    ",
        " ✨ Got a challenge? Let AI illuminate the path.                                     ",
        " ✨ Curiosity is your superpower—dive in now!                                        ",
        " ✨ Which course sparks your passion today?                                          ",
        " ✨ Stuck on a problem? Let's crack it together.                                     "
    ], []);

    // State to manage current prompt index and the text that has been typed so far
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        // Reset the displayed text when the prompt index changes
        setDisplayedText("");
        const currentPrompt = prompts[currentPromptIndex];
        let charIndex = 0;
        const typingSpeed = 50; // in milliseconds per character

        // Start interval to simulate typewriter effect
        const typeInterval = setInterval(() => {
            setDisplayedText(prev => prev + currentPrompt[charIndex]);
            charIndex++;

            // When all characters have been added, clear the interval
            if (charIndex >= currentPrompt.length) {
                clearInterval(typeInterval);
                // Pause before starting the next prompt (e.g., 1500 ms)
                setTimeout(() => {
                    setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
                }, 10);
            }
        }, typingSpeed);

        // Cleanup the interval if the component unmounts or the prompt changes
        return () => clearInterval(typeInterval);
    }, [currentPromptIndex, prompts]);

    return (
        <section className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center px-2 mt-24">
            <div>
                <img src="ai-feature.svg" alt="AI" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
                <div className="animate-slideDown p-4">
                    <div className="flex items-center border border-gray-700 rounded-full px-3 py-2 flex-1">
                        {/* Use the typewriter effect output as the placeholder */}
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
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    <span className="text-glow">AI</span> Powered Learning!
                </h1>
                <p className="mt-4 text-lg">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Gear</span> Up Your Learning Stage!<br />
                    Do not <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Fear</span> Programming Anymore!
                </p>
                <div className='flex gap-10 my-10'>
                    <Link to='/courses'>
                        <CommonButton>See Courses</CommonButton>
                    </Link>
                    <a href='https://youtube.com/@AlgoAspire/' target='_blank' rel="noopener noreferrer">
                        <CommonButton>Ask AI</CommonButton>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeatureAI;