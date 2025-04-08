import React from 'react';

const TextLesson = ({ lesson }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">{lesson.title}</h2>
            <p>{lesson.content || 'No text content available for this lesson.'}</p>
        </div>
    );
};

export default TextLesson;