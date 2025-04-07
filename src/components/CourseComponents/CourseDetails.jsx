import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CommonButton from "../Common/CommonButton";
import GlowingButton from "../Common/GlowingButton";
import { MdAssignmentAdd, MdOutlineQuiz } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuListTodo } from "react-icons/lu";


const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const { idAndSlug } = useParams();
    const navigate = useNavigate();

    // Split the parameter into id and slug
    const [id, slug] = idAndSlug ? idAndSlug.split('-') : [];

    useEffect(() => {
        api.get(`/api/course/details/${id}/`)
            .then(res => {
                setCourse(res.data);
                const correctSlug = res.data.slug;
                if (slug !== correctSlug) {
                    navigate(`/course/${id}-${correctSlug}`, { replace: true });
                }
            })
            .catch(err => console.error(err));
    }, [id, slug, navigate]);

    if (!course) {
        return <div className="text-center text-gray-300">Loading course details...</div>;
    }

    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
            <div>
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start gap-10">
                    <img
                        src={course.image}
                        alt={course.name}
                        className="w-full lg:w-[500px] rounded-xl shadow-lg aspect-video object-cover"
                    />
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-bold">{course.name}</h1>
                        <p className="text-gray-300 text-sm">Course Code: <span className="text-yellow-500 font-semibold">{course.code}</span></p>
                        <p className="leading-relaxed">{course.description}</p>
                        <p>
                            <span className="opacity-70">Instructor:</span>{" "}
                            <span className="font-semibold gradient-text cursor-pointer">{course.instructor_name}</span>
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 gradient-text text-xl px-4 py-1"> <VscFileSubmodule /> {course.module_count} Modules</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 gradient-text text-xl px-4 py-1"><LuListTodo /> {course.lesson_count} Lessons</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 gradient-text text-xl px-4 py-1"> <MdAssignmentAdd /> {course.assignment_count} Assignments</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 gradient-text text-xl px-4 py-1"><MdOutlineQuiz />{course.quiz_count} Quizzes</span>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <CommonButton>Enroll Now</CommonButton>
                            <GlowingButton>Start Learning</GlowingButton>
                        </div>
                    </div>
                </div>

                {/* Module List */}
                <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
                    <h2 className="text-2xl font-semibold mb-4 gradient-text">Course Modules</h2>
                    <ul className="space-y-3">
                        {course.modules.map((module, idx) => (
                            <li
                                key={module.id}
                                className="border-l-4 border-yellow-500 pl-4 py-2 bg-base-200 rounded-md hover:bg-base-300 transition"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">{idx + 1}. {module.title}</p>
                                    <span className="text-gray-400">{module.lesson_count} Lessons</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default CourseDetail;
