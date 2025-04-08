import React, { useState } from 'react';
import CommonButton from '../Common/CommonButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const QuizLesson = ({ lesson }) => {
    const quiz = lesson.quiz;
    const questions = quiz?.questions || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});

    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [currentQuestion.id]: option
        }));
    };

    const isOptionSelected = selectedOptions[currentQuestion?.id];

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

    if (!quiz) return <div>No quiz available.</div>;

    return (
        <div className="p-4 md:p-6 rounded-xl text-white space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-yellow-500">{lesson.title}</h2>
                <p className="text-sm text-gray-300 mt-1">{lesson.summary}</p>
                <h3 className="mt-4 text-lg font-semibold">{quiz.title}</h3>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium text-base">
                    Q{currentIndex + 1}: {currentQuestion.title}
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
                <CommonButton
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <FaArrowLeft /> Previous
                </CommonButton>

                <CommonButton
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold disabled:opacity-50"
                    onClick={handleNext}
                    disabled={!isOptionSelected || currentIndex === questions.length - 1}
                >
                    Next <FaArrowRight />
                </CommonButton>
            </div>

            <div className="text-sm text-gray-300 text-right">
                Question {currentIndex + 1} of {questions.length}
            </div>
        </div>
    );
};

export default QuizLesson;
