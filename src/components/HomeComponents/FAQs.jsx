import React from 'react';
import FAQ from './FAQ';
import faqs from '../../data/faqs.js';

const FAQs = () => {
    return (
        <section id='faqs' className='container mx-auto px-4 md:px-8 lg:px-16 mt-24 mb-10'>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                {/* Left - Text + FAQ Items */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-snug">
                        Frequently <span className="text-glow">Asked</span> Questions!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Everything <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">You</span><br />
                        Need to <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">Know!</span>
                    </p>

                    <div className="flex flex-col gap-2 mt-6">
                        {faqs.map(faq => (
                            <FAQ key={faq.id} faq={faq} />
                        ))}
                    </div>
                </div>

                {/* Right - Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img
                        src="/faq.svg"
                        alt="Frequently Asked Questions"
                        className="w-64 md:w-80 lg:w-[28rem] max-w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default FAQs;
