import React, { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import GlowingButton from '../Common/GlowingButton';
import {MdDashboard} from 'react-icons/md';


// Reusable circular stat
const ProgressCircle = ({ value, total, label }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return (
        <div className="flex flex-col items-center">
            <div className="radial-progress text-yellow-500" style={{ "--value": percentage, "--size": "5rem", "--thickness": "5px" }}>
                <span className='text-lg'><span className='text-3xl'>{value}</span>/{total}</span>
            </div>
            <p className="text-white mt-1">{label}</p>
        </div>
    );
};

// Course Card (for both running and completed)
const CourseCard = ({ course }) => (
    <div className="bg-gray-900 rounded-box p-3 w-80 flex-shrink-0 shadow-md text-white">
        <img src={course.image} alt={course.name} className="h-42 w-74 object-cover rounded-md mb-2" />
        <h3 className="text-xl font-semibold">{course.name}</h3>
        <p className="text-xs text-gray-300 mb-1">{course.slug}</p>
        <div className="w-full h-2 bg-gray-500 rounded-full mb-1 overflow-hidden">
            <div className="bg-yellow-500 h-full" style={{ width: `${course.progress}%` }}></div>
        </div>
        <p className="text-sm text-white">{course.progress}% completed</p>
        {course.estimate_completion_date && (
            <p className="text-xs text-gray-200 mt-1">Est. completion: {course.estimate_completion_date}</p>
        )}
        {course.completed_at && (
            <p className="text-xs text-gray-200 mt-1">Completed: {course.completed_at}</p>
        )}
    </div>
);

const Summary = () => {
    const [userSummary, setUserSummary] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/account/${username}/summary/`);
                setUserSummary(response.data);
            } catch (error) {
                toast.error("Error fetching data");
                console.error(error);
            }
        };
        fetchData();
    }, [username]);

    if (!userSummary) {
        return <div className="text-center text-gray-300 py-10">Loading summary...</div>;
    }

    const {
        running_course,
        completed_courses = [],
        completed_course_count,
        completed_lesson_count,
        completed_quiz_count,
        completed_assignment_count,
        total_course_count,
        total_lesson_count,
        total_quiz_count,
        total_assignment_count,
    } = userSummary;

    return (
        <div className="p-4 space-y-8 max-w-5xl mx-auto text-white">
            {/* Running Course */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 border-b border-gray-500 pb-1">Running Course</h2>
                {running_course ? (
                    <CourseCard course={running_course} />
                ) : (
                    <p className="italic text-gray-300 py-5 text-center">Not enrolled in any course currently.</p>
                )}
            </div>

            {/* Completed Courses Scroll */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 border-b border-gray-500 pb-1">Completed Courses</h2>
                {completed_courses.length > 0 ? (
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {completed_courses.map((course, index) => (
                            <CourseCard course={course} key={index} />
                        ))}
                    </div>
                ) : (
                    <p className="italic text-gray-300 py-5 text-center">No completed courses yet.</p>
                )}
            </div>

            {/* Circular Stats */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 border-b border-gray-500 pb-1">Student Analytics</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-4">
                    <ProgressCircle value={completed_course_count} total={total_course_count} label="Courses Completed" />
                    <ProgressCircle value={completed_lesson_count} total={total_lesson_count} label="Lessons Completed" />
                    <ProgressCircle value={completed_quiz_count} total={total_quiz_count} label="Quizzes Completed" />
                    <ProgressCircle value={completed_assignment_count} total={total_assignment_count} label="Assignments Completed" />
                </div>
                <div className='flex justify-center mt-10'>
                <Link to='/dashboard'><GlowingButton><MdDashboard />My Dashboard</GlowingButton></Link>
                </div>
            </div>
        </div>
    );
};

export default Summary;
