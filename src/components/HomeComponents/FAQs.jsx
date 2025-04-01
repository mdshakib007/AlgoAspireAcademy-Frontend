import React from 'react';
import FAQ from './FAQ';
import faqs from '../../data/faqs.js';

const FAQs = () => {
    return (
        <section className='container mx-auto mt-24 px-2 mb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                Frequently <span className="text-glow"> Asked </span>Questions!
            </h1>
            <p className="mt-4 text-lg">
                Everything<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> You </span><br />Need to<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Know!</span>
            </p>
            {
                faqs.map(faq => (
                    <FAQ key={faq.id} faq={faq}></FAQ>
                ))
            }
        </section>
    );
};

export default FAQs;