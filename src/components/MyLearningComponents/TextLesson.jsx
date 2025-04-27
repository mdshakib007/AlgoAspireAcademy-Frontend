import React from 'react';
import CustomMarkdown from '../Common/CustomMarkdown';
import { formatDate } from '../../utils/postActions';

const TextLesson = ({ lesson }) => {

    return (
        <div className='space-y-4'>
            <div className='flex justify-between gap-3 border-b-5 border-gray-700 gradient-text'>
                <h2 className="md:text-xl font-bold">{lesson.title}</h2>
                <p className='text-xs md:text-sm'>Updated: {formatDate(lesson.updated_at)}</p>
            </div>
            <div className='border-yellow-500 border-l-5 px-2'>
                <h1 className=' md:text-lg text-yellow-500 font-bold'>Lesson Summary</h1>
                <p className='text-sm text-gray-300'>{lesson?.summary || 'No Summary Available'}</p>
            </div>

            <CustomMarkdown>
                {lesson.text_editorial || 'No text content available for this lesson.'}
            </CustomMarkdown>
        </div>
    );
};

export default TextLesson;