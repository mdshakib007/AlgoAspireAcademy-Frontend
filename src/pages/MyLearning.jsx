import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { MdOndemandVideo } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuNotebookText, LuFileQuestion } from 'react-icons/lu';
import toast from 'react-hot-toast';
import TextLesson from '../components/MyLearningComponents/TextLesson';
import VideoLesson from '../components/MyLearningComponents/VideoLesson';
import AssignmentLesson from '../components/MyLearningComponents/AssignmentLesson';
import QuizLesson from '../components/MyLearningComponents/QuizLesson';


// Function to return the icon based on the lecture type.
const getIcon = (type) => {
    switch (type) {
        case 'Video':
            return <MdOndemandVideo className="text-yellow-500" />;
        case 'Text':
            return <IoDocumentTextOutline className="text-yellow-500" />;
        case 'Assignment':
            return <LuNotebookText className="text-yellow-500" />;
        case 'Quiz':
            return <LuFileQuestion className="text-yellow-500" />;
        default:
            return <span className="text-yellow-500">📄</span>;
    }
};

const MyLearning = () => {
    const { idAndSlug } = useParams();
    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);

    const [id, slug] = idAndSlug ? idAndSlug.split('-') : [];

    useEffect(() => {
        if (id) {
            api.get(`/api/course/details/${id}/`)
                .then((res) => {
                    setCourse(res.data);
                    if (res.data.modules.length > 0 && res.data.modules[0].lessons.length > 0) {
                        fetchLessonDetails(res.data.modules[0].lessons[0]);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const fetchLessonDetails = async (lesson) => {
        setCurrentLesson(lesson)
        try{
            const res = await api.get(`/api/course/lesson/details/${lesson.id}/`);
            setCurrentLesson(res.data);
        }
        catch(err){
            toast.error("An error occurred");
        }
    };

    // Render lesson content based on lecture type.
    const renderLessonContent = () => {
        if (!currentLesson) {
            return <p className="text-gray-400 italic">Select a lesson to begin.</p>;
        }
        switch (currentLesson.lecture_type) {
            case 'Text':
                return <TextLesson lesson={currentLesson} />;
            case 'Video':
                return <VideoLesson lesson={currentLesson} />;
            case 'Assignment':
                return <AssignmentLesson lesson={currentLesson} />;
            case 'Quiz':
                return <QuizLesson lesson={currentLesson} />;
            default:
                return <p className="text-red-500">Unsupported lesson type.</p>;
        }
    };

    return (
        <section className="container mx-auto px-4 md:px-8 py-6">
            {course ? (
                <>
                    {/* Course Header (optional addition for context) */}
                    <header className="mb-6">
                        <h1 className="text-2xl lg:text-3xl font-bold">{course.name}</h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Right Side: Lesson Content (show first on mobile) */}
                        <main className="order-1 lg:order-2 bg-base-100 rounded-lg shadow p-4 min-h-[300px] lg:col-span-2">
                            {renderLessonContent()}
                        </main>

                        {/* Left Side: Lessons (show second on mobile, first on large screens) */}
                        <aside className="order-2 lg:order-1 bg-base-200 rounded-lg shadow p-4">
                            <h2 className="text-xl font-bold mb-4">Lessons</h2>
                            <div className="space-y-4">
                                {course.modules.map((module, idx) => (
                                    <div key={module.id}>
                                        <h3 className="font-semibold text-yellow-500">
                                            {idx + 1}. {module.title}
                                        </h3>
                                        <ul className="pl-2 mt-1 space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <li
                                                    key={lesson.id}
                                                    onClick={() => fetchLessonDetails(lesson)}
                                                    className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition hover:bg-gray-500 ${currentLesson?.id === lesson.id ? 'bg-gray-500' : ''
                                                        }`}
                                                >
                                                    {getIcon(lesson.lecture_type)}
                                                    <span className="text-sm">{lesson.title}</span>
                                                    {!lesson.is_published && (
                                                        <span className="badge badge-warning text-xs">
                                                            Unpublished
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">Loading course details...</div>
            )}
        </section>
    );
};

export default MyLearning;
