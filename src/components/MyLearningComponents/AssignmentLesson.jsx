import React from 'react';
import CommonButton from '../Common/CommonButton';

const AssignmentLesson = ({ lesson }) => {
    const assignment = lesson.assignment;

    if (!assignment) return <div className="text-gray-300">No assignment data available.</div>;

    return (
        <div className="p-4 md:p-6 rounded-xl text-white space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-yellow-500">{lesson.title}</h2>
                {lesson.summary && (
                    <p className="mt-2 text-sm text-gray-300">{lesson.summary}</p>
                )}
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

            <div className="text-right text-sm text-gray-300">
                Updated: {new Date(lesson.updated_at).toLocaleDateString()}
            </div>
        </div>
    );
};

export default AssignmentLesson;
