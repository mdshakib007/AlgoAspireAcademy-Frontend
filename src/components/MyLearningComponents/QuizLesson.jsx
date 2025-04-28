import React, { useState, useEffect } from 'react';
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
    const [marks, setMarks] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState({});

    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (lessonCompletion) {
            // Set answers if quiz is already completed
            setSelectedOptions(lessonCompletion.quiz_answers || {});
        }
    }, [lessonCompletion]);

    const handleOptionSelect = (option) => {
        if (!submitted) {
            setSelectedOptions(prev => ({
                ...prev,
                [currentQuestion.id]: option
            }));
        }
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
        let totalMarks = 0;
        let answerDetails = {};

        questions.forEach((question) => {
            const userAnswer = selectedOptions[question.id];
            const correctAnswer = question.correct_option;

            // Check if the answer is correct and assign marks
            const isCorrect = userAnswer === correctAnswer;
            if (isCorrect) totalMarks++;

            // Store explanation
            answerDetails[question.id] = {
                correctAnswer,
                explanation: question.explanation,
                isCorrect
            };
        });

        setMarks(totalMarks);
        setCorrectAnswers(answerDetails);

        const success = await markCompleted({ quizAnswers: selectedOptions, quizMarks: totalMarks });
        if (success) {
            setSubmitted(true);
            toast.success("Quiz submitted successfully.");
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

            {isCompleted && (
                <div className="text-center">
                    <p className="text-green-400 font-semibold">
                        You Already Completed This Quiz, Score:
                        <span className='font-mono text-2xl'> {lessonCompletion?.quiz_marks}/{questions.length}</span>
                    </p>
                </div>
            )}

            <div className="space-y-4">
                <h4 className="font-bold text-xl text-yellow-500 px-2">
                    Q{currentIndex + 1}: {currentQuestion?.title}
                </h4>
                <div className="grid gap-3">
                    {['A', 'B', 'C', 'D'].map((opt) => {
                        const optionText = currentQuestion[`option_${opt.toLowerCase()}`];
                        const isSelected = selectedOptions[currentQuestion.id] === opt;
                        const isDisabled = submitted; // Disable options after submission

                        return (
                            <button
                                key={opt}
                                className={`border px-4 py-2 rounded-md text-left ${isSelected
                                    ? 'bg-yellow-500 text-black font-bold'
                                    : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                                onClick={() => handleOptionSelect(opt)}
                                disabled={isDisabled} // Disable if submitted
                            >
                                <span className="font-bold mr-2">{opt}.</span> {optionText}
                            </button>
                        );
                    })}
                </div>

                {(submitted || isCompleted) && (
                    <div className="my-5 border-l-5 border-yellow-500 px-2">
                        <p>
                            Correct Option: <span className='font-bold'>{currentQuestion.correct_option}</span>
                        </p>
                        <p>
                            Explanation: <span className="font-bold">{currentQuestion.explanation}</span>
                        </p>
                    </div>
                )}
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
                <div>
                    <p className='text-lg font-bold'>Marks: <span className='font-mono'>{marks}/{questions.length}</span></p>
                    {questions.map((question) => (
                        <div key={question.id} className="mt-4">
                            <h5 className="text-yellow-500 font-semibold">Q{question.id}: {question.title}</h5>
                            <p className={`text-sm ${correctAnswers[question.id]?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                {correctAnswers[question.id]?.isCorrect ? "Correct!" : "Incorrect!"}
                            </p>
                            <p className="text-gray-300">Your answer: {selectedOptions[question.id]}</p>
                            <p className="text-gray-300">Correct answer: {correctAnswers[question.id]?.correctAnswer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizLesson;
