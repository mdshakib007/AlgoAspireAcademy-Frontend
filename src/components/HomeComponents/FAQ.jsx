import React from 'react';

const FAQ = ({ faq }) => {
    const { question, answer } = faq;

    return (
        <div className="collapse collapse-arrow bg-gray-700 border border-gray-900 mt-2">
            <input type="radio" name={`faq-accordion`} />
            <div className="collapse-title font-semibold text-xl gradient-text">{question}</div>
            <div className="collapse-content text-lg text-gray-300">{answer}</div>
        </div>
    );
};

export default FAQ;