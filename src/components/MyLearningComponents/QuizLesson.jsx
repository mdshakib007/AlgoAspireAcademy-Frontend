import React, { useState } from 'react';
import CommonButton from '../Common/CommonButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { formatDate } from '../../utils/postActions';
import { useLessonCompletion } from '../../hooks/useLessonCompletion';
import toast from 'react-hot-toast';


const QuizLesson = ({ lesson, enrollmentId, lessonCompletion }) => {
    const isCompleted = lessonCompletion ? true : false;
    const quiz = lesson.quiz;
    const questions = quiz?.questions || [];

    const { markCompleted, loading } = useLessonCompletion(enrollmentId, lesson.id);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);


    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [currentQuestion.id]: option
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleQuizSubmit = async () => {
        const quizAnswers = Object.entries(selectedOptions).reduce((acc, [questionId, answer]) => {
            acc[questionId] = answer;
            return acc;
        }, {});

        const success = await markCompleted({ quizAnswers });
        if (success) {
            setSubmitted(true);
            toast.success("Quiz submitted successfully.")
        }
    };


    if (!quiz) return <div>No quiz available.</div>;


    return (
        <div className="p-2 md:p-6 rounded-xl text-white space-y-6">
            <div className='flex justify-between gap-3 border-b-5 border-gray-700 gradient-text'>
                <h2 className="md:text-xl font-bold">{lesson.title}</h2>
                <p className='text-xs md:text-sm'>Updated: {formatDate(lesson.updated_at)}</p>
            </div>
            <div className='border-yellow-500 border-l-5 px-2'>
                <h1 className=' md:text-lg text-yellow-500 font-bold'>Lesson Summary</h1>
                <p className='text-sm text-gray-300'>{lesson?.summary || 'No Summary Available'}</p>
            </div>

            <h3 className="mt-4 text-lg font-bold">Quiz: {quiz?.title}</h3>

            <div className="space-y-4">
                <h4 className="font-bold text-base text-yellow-500 border-yellow-500 border-l-5 px-2">
                    Q{currentIndex + 1}: {currentQuestion?.title}
                </h4>
                <div className="grid gap-3">
                    {['A', 'B', 'C', 'D'].map((opt) => {
                        const optionText = currentQuestion[`option_${opt.toLowerCase()}`];
                        const isSelected = selectedOptions[currentQuestion.id] === opt;

                        return (
                            <button
                                key={opt}
                                className={`border px-4 py-2 rounded-md text-left ${isSelected
                                    ? 'bg-yellow-500 text-black font-bold'
                                    : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                                onClick={() => handleOptionSelect(opt)}
                            >
                                <span className="font-bold mr-2">{opt}.</span> {optionText}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <CommonButton onClick={handlePrev} disabled={currentIndex === 0}>
                    <FaArrowLeft />
                </CommonButton>

                {currentIndex === questions.length - 1 ? (
                    <CommonButton onClick={handleQuizSubmit} disabled={isCompleted || submitted || loading}>
                        {submitted ? "Submitted" : "Submit Quiz"}
                    </CommonButton>
                ) : (
                    <CommonButton onClick={handleNext} disabled={!selectedOptions[currentQuestion?.id]}>
                        Next <FaArrowRight />
                    </CommonButton>
                )}
            </div>

            <div className="text-sm text-gray-300 text-right">
                Question {currentIndex + 1} of {questions.length}
            </div>

            {submitted && (
                <p className="text-green-400 font-semibold text-center mt-4">
                    Quiz submitted successfully!
                </p>
            )}

        </div>
    );
};

export default QuizLesson;
