import React, { useState } from 'react';
import CommonButton from '../Common/CommonButton';
import { formatDate } from '../../utils/postActions';
import { useLessonCompletion } from '../../hooks/useLessonCompletion';
import toast from 'react-hot-toast';
import { FaQuestion } from 'react-icons/fa';

const AssignmentLesson = ({ lesson, enrollmentId, isCompleted }) => {
    const assignment = lesson.assignment;
    const { markCompleted, loading } = useLessonCompletion(enrollmentId, lesson.id);

    const [submissionText, setSubmissionText] = useState("");
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const handleAssignmentSubmit = async () => {
        if (!submissionText.trim()) {
            toast.error("Please write your answer to submit");
            return;
        };

        const success = await markCompleted({ assignmentSubmission: submissionText });
        if (success) {
            setSubmissionSuccess(true);
            // Optionally, clear the submissionText if needed
            // setSubmissionText("");
        }
    };

    if (!assignment) {
        return <div className="text-gray-300">No assignment data available.</div>;
    }

    return (
        <div className="p-2 md:p-6 rounded-xl text-white space-y-4">
            <div className="flex justify-between gap-3 border-b-4 border-gray-700 gradient-text">
                <h2 className="md:text-xl font-bold">{lesson.title}</h2>
                <p className="text-xs md:text-sm">Updated: {formatDate(lesson.updated_at)}</p>
            </div>

            <div className="border-l-4 border-yellow-500 px-2">
                <h1 className="md:text-lg text-yellow-500 font-bold">Lesson Summary</h1>
                <p className="text-sm text-gray-300">{lesson?.summary || 'No Summary Available'}</p>
            </div>

            <div className="space-y-3 p-2">
                <h3 className="text-lg font-semibold text-yellow-500">{assignment.title}</h3>
                <p className="font-bold text-2xl">Question: {assignment.question}</p>
                <p className='flex justify-between gap-2'>
                    Total Marks: {assignment.total_mark}
                    <span className='tooltip' data-tip="Please provide assignment solution google docs link" >
                        <FaQuestion />
                    </span>
                </p>


                <div className="flex flex-col gap-5 items-center">
                    <textarea
                        aria-label="Assignment submission textarea"
                        name="assignment-submission-box"
                        id="assignment-submission-box"
                        className="textarea w-full"
                        rows={10}
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Submit Your Assignment..."
                        disabled={isCompleted || submissionSuccess}
                        required
                    />
                    <CommonButton
                        onClick={handleAssignmentSubmit}
                        disabled={loading || isCompleted || submissionSuccess}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </CommonButton>

                    {submissionSuccess && (
                        <p className="text-green-400 font-semibold">Assignment submitted successfully!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentLesson;
