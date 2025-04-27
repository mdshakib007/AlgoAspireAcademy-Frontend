import React, { useState } from 'react';
import CommonButton from '../Common/CommonButton';
import { formatDate, formatDateTime } from '../../utils/postActions';
import { useLessonCompletion } from '../../hooks/useLessonCompletion';
import toast from 'react-hot-toast';
import { FaQuestion } from 'react-icons/fa';
import GlowingButton from '../Common/GlowingButton';


const AssignmentLesson = ({ lesson, enrollmentId, lessonCompletion }) => {
    const assignment = lesson.assignment;
    const isCompleted = lessonCompletion ? true : false;
    const { markCompleted, loading } = useLessonCompletion(enrollmentId, lesson.id);

    const [submissionText, setSubmissionText] = useState("");
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAssignmentSubmit = async () => {
        const urlRegex = /^(https?:\/\/)?(www\.)?(docs\.google\.com)\/.+$/;

        if (!submissionText.trim()) {
            toast.error("Please provide your answer link before submitting.");
            return;
        }
        if (!urlRegex.test(submissionText.trim())) {
            toast.error("Please submit a valid Google Docs URL.");
            return;
        }

        const success = await markCompleted({ assignmentSubmission: submissionText });
        if (success) {
            setSubmissionSuccess(true);
            setSubmissionText("");
            toast.success("Assignment submitted successfully!");
        }
    };

    if (!assignment) {
        return <div className="text-gray-300">No assignment data available.</div>;
    }

    return (
        <div className="p-2 md:p-6 rounded-xl text-white space-y-6">
            <div className='flex justify-between gap-3 border-b-5 border-gray-700 gradient-text'>
                <h2 className="md:text-xl font-bold">{lesson.title}</h2>
                <p className='text-xs md:text-sm'>Updated: {formatDate(lesson.updated_at)}</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h1 className="md:text-lg text-yellow-500 font-bold mb-2">Lesson Summary</h1>
                <p className="text-sm text-gray-300">{lesson?.summary || 'No Summary Available'}</p>
            </div>

            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-yellow-500">{assignment.title}</h3>
                    <GlowingButton onClick={() => setIsModalOpen(true)} >
                        Important Rules
                    </GlowingButton>
                </div>

                <p className="font-bold text-xl">Question: {assignment.question}</p>

                <div className="flex items-center gap-2 text-sm">
                    <span>Total Marks: {assignment.total_mark}</span>
                    <span className='tooltip' data-tip="Provide your assignment solution link here (Google Docs)">
                        <FaQuestion />
                    </span>
                </div>

                {
                    isCompleted ? (
                        <div className="bg-gray-800 p-2 rounded-xl space-y-4 mt-6">
                            <h1 className="text-2xl font-bold text-center gradient-text">You Already Submitted This Assignment</h1>

                            <div className="border-l-4 border-yellow-500 pl-4">
                                <h2 className="text-lg text-yellow-500 font-bold mb-1">Submission Details</h2>
                                <p className="text-sm">Submitted At: {formatDateTime(lessonCompletion?.completed_at)}</p>
                            </div>

                            <div className="bg-gray-700 p-4 rounded-md space-y-2 flex flex-col items-center text-lg">
                                My Submission:
                                <a
                                    href={lessonCompletion?.assignment_submission}
                                    className="link link-warning break-words"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {lessonCompletion?.assignment_submission}
                                </a>
                                Marks:
                                <p className='font-bold text-green-500 text-2xl'>
                                    {lessonCompletion?.assignment_marks ? (<>
                                        <span className='font-mono'>{lessonCompletion?.assignment_marks}/{assignment.total_mark}</span>
                                    </>) : ('Marking is Pending')}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5 items-center">
                            <textarea
                                aria-label="Assignment Submission Textarea"
                                id="assignment-submission-box"
                                className="textarea textarea-bordered w-full min-h-[150px]"
                                value={submissionText}
                                onChange={(e) => setSubmissionText(e.target.value)}
                                placeholder="Paste your Google Docs link here..."
                                disabled={isCompleted || submissionSuccess}
                                required
                            />
                            <CommonButton
                                onClick={handleAssignmentSubmit}
                                disabled={loading || isCompleted || submissionSuccess}
                            >
                                {loading ? 'Submitting...' : 'Submit Assignment'}
                            </CommonButton>

                            {submissionSuccess && (
                                <p className="text-green-400 font-semibold">Assignment Submitted Successfully!</p>
                            )}
                        </div>
                    )
                }
            </div>

            {/* Modal for Important Notes */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-gray-900 text-white">
                        <h3 className="font-bold text-2xl text-yellow-400">Assignment Submission Guidelines</h3>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-300">
                            <li>Submit a <span className="text-yellow-500 font-semibold">Google Docs link</span> only.</li>
                            <li>Ensure that the document is set to <span className="text-yellow-500 font-semibold">"Anyone with the link can view."</span></li>
                            <li>Assignment once submitted cannot be changed.</li>
                            <li>Improper or inaccessible links will be treated as invalid submissions.</li>
                            <li>Marks will be assigned after manual review.</li>
                        </ul>

                        <div className="modal-action mt-6">
                            <CommonButton onClick={() => setIsModalOpen(false)} >
                                Got It
                            </CommonButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentLesson;
