import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CommonButton from "../Common/CommonButton";
import { MdAssignmentAdd, MdOutlineQuiz, MdOndemandVideo } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuListTodo, LuFileQuestion, LuNotebookText } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";
import CourseFeatures from "./CourseFeatures";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";


const getIcon = (type) => {
    switch (type) {
        case "Video":
            return <MdOndemandVideo className="text-yellow-500" />;
        case "Text":
            return <IoDocumentTextOutline className="text-yellow-500" />;
        case "Assignment":
            return <LuNotebookText className="text-yellow-500" />;
        case "Quiz":
            return <LuFileQuestion className="text-yellow-500" />;
        default:
            return <span><IoDocumentTextOutline className="text-yellow-500" /></span>;
    }
};


const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const { idAndSlug } = useParams();
    const navigate = useNavigate();
    const { user, fetchMe } = useContext(AuthContext);

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

    const enrollNow = async () => {
        if (!user) fetchMe();
        if (!user) {
            toast.error("Please login to enroll a course");
            return;
        }

        try {
            await api.post('/api/enrollment/create/', { course: id });
            toast.success("Enrollment Success!");
            navigate('/my-learning');
        } catch (err) {
            if (err.response) toast.error(err.response.data.error);
            else toast.error("An error occurred");
        }
    }

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
                        <h1 className="text-4xl font-bold">
                            {course.name} {course.i_enrolled && <span className="text-lg border px-2 py-1 rounded-box text-glow badge-warning">Already Enrolled</span>}
                        </h1>
                        <p className="text-gray-300 text-sm">Course Code: <span className="text-yellow-500 font-semibold">{course.code}</span></p>
                        <p className="leading-relaxed">{course.description}</p>
                        <p>
                            <span className="opacity-70">Instructor:</span>{" "}
                            <span className="font-semibold text-yellow-500 hover:underline cursor-pointer">
                                <HashLink
                                    to={`/profile/${course.instructor_name}#`}>
                                    {course.instructor_name}
                                </HashLink>
                            </span>
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1"> <VscFileSubmodule /> {course.module_count} Modules</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1"><LuListTodo /> {course.lesson_count} Lessons</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1"> <MdAssignmentAdd /> {course.assignment_count} Assignments</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1"><MdOutlineQuiz />{course.quiz_count} Quizzes</span>
                            <span className="border flex items-center gap-2 rounded-box border-yellow-500 px-4 py-1"><FaUserFriends />{course.enrolled} Enrolled</span>
                        </div>
                        <div className="flex gap-4 mt-6">
                            {
                                course.i_enrolled ? <HashLink to={`/my-learning/course/${course.id}-${course.slug}#`}>
                                    <CommonButton>Continue Learning</CommonButton>
                                </HashLink> :
                                    <CommonButton onClick={enrollNow}>Enroll Now</CommonButton>
                            }
                            <HashLink to='#features'>
                                <CommonButton>All Features</CommonButton>
                            </HashLink>
                        </div>
                    </div>
                </div>

                {/* Module List */}
                <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300 mt-10">
                    <h2 className="text-2xl font-semibold mb-4 gradient-text">Course Content</h2>
                    <div className="space-y-4">
                        {course.modules.map((module, idx) => (
                            <div
                                key={module.id}
                                className="collapse collapse-arrow bg-base-200 rounded-box"
                            >
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {idx + 1}. {module.title}
                                    <span className="text-gray-400 ml-2 font-light">({module.lesson_count} Lessons)</span>
                                </div>
                                <div className="collapse-content">
                                    {module.lessons.length === 0 ? (
                                        <p className="text-gray-400 italic">No lessons added yet.</p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <li
                                                    key={lesson.id}
                                                    className="flex items-center justify-between bg-base-100 p-3 rounded-md border border-base-300 hover:bg-base-300 transition"
                                                >
                                                    <span className="flex items-center gap-2 font-medium">
                                                        {getIcon(lesson.lecture_type)}
                                                        {lesson.title}
                                                    </span>
                                                    {!lesson.is_published && (
                                                        <span className="badge badge-warning text-xs">Unpublished</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* features */}
                <CourseFeatures i_enrolled={course.i_enrolled} enrollNow={enrollNow}></CourseFeatures>
            </div>
        </section>
    );
};

export default CourseDetail;
