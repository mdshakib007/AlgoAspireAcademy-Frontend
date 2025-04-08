import React from "react";
import { HashLink } from "react-router-hash-link";
import CommonButton from "../Common/CommonButton";
import { Link } from "react-router-dom";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuListTodo } from "react-icons/lu";
import { MdAssignmentAdd, MdOutlineQuiz } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

// Progress bar component
const ProgressBar = ({ progress, estimateCompletionDate, completedAt }) => {
    return (
        <div>
            <div className="flex justify-between items-center gap-3 text-gray-300">
                <p>Progress</p>
            <div className="w-full h-3 bg-gray-500 rounded-full mb-1">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{progress}%</p>
            </div>
            {estimateCompletionDate && (
                <p className="text-xs text-gray-200 mt-1">Est. completion {estimateCompletionDate}</p>
            )}
            {completedAt && (
                <p className="text-xs text-gray-200 mt-1">Completed {completedAt}</p>
            )}
        </div>
    );
};

// Course card component
const MyCourseCard = ({ course }) => {
    return (
        <div className="flex flex-col lg:flex-row items-start gap-10">
            <img
                src={course.image}
                alt={course.name}
                className="w-full lg:w-[500px] rounded-xl shadow-lg aspect-video object-cover"
            />
            <div className="flex-1 space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{course.name}</h1>
                {/* Progress Bar */}
                <ProgressBar
                    progress={course.progress}
                    estimateCompletionDate={course.estimate_completion_date}
                    completedAt={course.completed_at}
                />
                <p>
                    <span className="opacity-70">By </span>{" "}
                    <span className="font-semibold text-yellow-500 hover:underline cursor-pointer">
                        <Link to={`/profile/${course.instructor}`}>
                            {course.instructor}
                        </Link>
                    </span>
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                    <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1">
                        <VscFileSubmodule /> {course.module_count} Modules
                    </span>
                    <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1">
                        <LuListTodo /> {course.lesson_count} Lessons
                    </span>
                    <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1">
                        <MdAssignmentAdd /> {course.assignment_count} Assignments
                    </span>
                    <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1">
                        <MdOutlineQuiz /> {course.quiz_count} Quizzes
                    </span>
                </div>
                <div className="flex gap-4 mt-6">
                    <HashLink to={`course/${course.id}-${course.slug}#`}>
                        <CommonButton>Continue Learning</CommonButton>
                    </HashLink>
                    <HashLink to={`/course/${course.id}-${course.slug}#`}>
                        <CommonButton>Details</CommonButton>
                    </HashLink>
                </div>
            </div>
        </div>
    );
};

export default MyCourseCard;
