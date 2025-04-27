import React from 'react';

const FAQ = ({ faq }) => {
    const { question, answer } = faq;

    return (
        <div className="collapse collapse-arrow border border-gray-500 mt-2">
            <input type="checkbox" name={`faq-accordion`} />
            <div className="collapse-title font-semibold text-xl">{question}</div>
            <div className="collapse-content text-lg text-gray-300">{answer}</div>
        </div>
    );
};

export default FAQ;