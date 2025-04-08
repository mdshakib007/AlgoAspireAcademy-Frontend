import React from 'react';
import CustomMarkdown from '../Common/CustomMarkdown';

const TextLesson = ({ lesson }) => {

    return (
        <div>
            <div className='flex justify-between'>
            <h2 className="text-xl font-bold">{lesson.title}</h2>
            <p className='text-gray-300 text-sm'>Updated: {new Date(lesson.updated_at).toLocaleDateString()}</p>
            </div>
            <CustomMarkdown>{lesson.text_editorial || 'No text content available for this lesson.'}</CustomMarkdown>
        </div>
    );
};

export default TextLesson;