import React from 'react';
import CommonButton from '../Common/CommonButton';
import { formatDate } from '../../utils/postActions';

const AssignmentLesson = ({ lesson }) => {
    const assignment = lesson.assignment;

    if (!assignment) return <div className="text-gray-300">No assignment data available.</div>;

    return (
        <div className="p-2 md:p-6 rounded-xl text-white space-y-4">
            <div className='flex justify-between gap-3 border-b-5 border-gray-700 gradient-text'>
                <h2 className="md:text-xl font-bold">{lesson.title}</h2>
                <p className='text-xs md:text-sm'>Updated: {formatDate(lesson.updated_at)}</p>
            </div>
            <div className='border-yellow-500 border-l-5 px-2'>
                <h1 className=' md:text-lg text-yellow-500 font-bold'>Lesson Summary</h1>
                <p className='text-sm text-gray-300'>{lesson?.summary || 'No Summary Available'}</p>
            </div>

            <div className="space-y-3 p-2">
                <h3 className="text-lg font-semibold text-yellow-500">{assignment.title}</h3>
                <p className='font-bold text-2xl '>Question: {assignment.question}</p>
                <p>Total Marks: {assignment.total_mark}</p>

                <div className='flex flex-col gap-5 items-center'>
                    <textarea
                        name="assignment-submission-box"
                        id="assignment-submission-box"
                        className='textarea w-full'
                        rows={10}
                        placeholder='Submit Your Assignment...'>
                    </textarea>
                    <CommonButton>Submit</CommonButton>
                </div>
            </div>
        </div>
    );
};

export default AssignmentLesson;
