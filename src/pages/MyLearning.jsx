import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { MdOndemandVideo, MdDoDisturb, MdCheckCircle } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuNotebookText, LuFileQuestion } from 'react-icons/lu';
import toast from 'react-hot-toast';
import TextLesson from '../components/MyLearningComponents/TextLesson';
import VideoLesson from '../components/MyLearningComponents/VideoLesson';
import AssignmentLesson from '../components/MyLearningComponents/AssignmentLesson';
import QuizLesson from '../components/MyLearningComponents/QuizLesson';
import Notes from '../components/MyLearningComponents/Notes';
import { AuthContext } from '../context/AuthContext';
import { useLessonCompletion } from '../hooks/useLessonCompletion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


// A reusable checkbox component for marking lesson as completed
const LessonCompletionCheckbox = ({ enrollmentId, lessonId, isCompleted, onCompletion }) => {
    const { markCompleted, loading } = useLessonCompletion(enrollmentId, lessonId);

    const handleCheckbox = async () => {
        const success = await markCompleted();
        if (success) {
            toast.success("Lesson marked as completed.");
            if (onCompletion) {
                onCompletion(lessonId);  // notify parent component
            }
        }
    };

    if (isCompleted) return null;

    return (
        <div className="flex items-center space-x-2 p-4 border border-gray-700 rounded-lg bg-gray-900 mt-6">
            <label className="text-green-500 font-bold cursor-pointer flex items-center gap-2">
                <input
                    type="checkbox"
                    onChange={handleCheckbox}
                    disabled={loading}
                    className="checkbox checkbox-success"
                    id={lessonId}
                />
                Mark Lesson Completed?
            </label>
        </div>
    );
};


// Icons based on lesson types
const getIcon = (type) => {
    switch (type) {
        case 'Video': return <MdOndemandVideo className="text-yellow-500" />;
        case 'Text': return <IoDocumentTextOutline className="text-yellow-500" />;
        case 'Assignment': return <LuNotebookText className="text-yellow-500" />;
        case 'Quiz': return <LuFileQuestion className="text-yellow-500" />;
        default: return <span className="text-yellow-500">📄</span>;
    }
};

const MyLearning = () => {
    const { user, fetchMe } = useContext(AuthContext);
    const { idAndSlug } = useParams();
    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [enrollmentData, setEnrollmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNotes, setShowNotes] = useState(false);

    const [id] = idAndSlug ? idAndSlug.split('-') : [];

    const isLessonCompleted = (lessonId) => {
        return enrollmentData?.lesson_completions?.some(lc => lc.lesson === lessonId);
    };

    const findLessonCompletion = (lessonId) => {
        return enrollmentData?.lesson_completions?.find(lc => lc.lesson === lessonId);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!user) {
                    await fetchMe();
                }
                if (id) {
                    const [courseRes, enrollmentRes] = await Promise.all([
                        api.get(`/api/course/details/${id}/`),
                        api.get(`/api/enrollment/details/0/?user_id=${user?.id || localStorage.getItem('user_id')}&course_id=${id}`)
                    ]);
                    setCourse(courseRes.data);
                    setEnrollmentData(enrollmentRes.data);

                    if (courseRes.data.modules.length > 0 && courseRes.data.modules[0].lessons.length > 0) {
                        await fetchLessonDetails(courseRes.data.modules[0].lessons[0]);
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load course or enrollment data.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, user]);

    const fetchLessonDetails = async (lesson) => {
        try {
            const res = await api.get(`/api/course/lesson/details/${lesson.id}/`);
            setCurrentLesson(res.data);
        } catch {
            toast.error('An error occurred while fetching lesson details.');
        }
    };

    const handleLessonCompleted = (completedLessonId) => {
        setEnrollmentData(prev => ({
            ...prev,
            lesson_completions: [
                ...(prev?.lesson_completions || []),
                { lesson: completedLessonId } // Push the newly completed lesson
            ]
        }));
    };


    const renderLessonContent = () => {
        if (!currentLesson) {
            return <p className="text-gray-400 italic">Select a lesson to begin.</p>;
        }
        switch (currentLesson.lecture_type) {
            case 'Text': return <TextLesson lesson={currentLesson} />;
            case 'Video': return <VideoLesson lesson={currentLesson} />;
            case 'Assignment': return <AssignmentLesson
                enrollmentId={enrollmentData?.id}
                lessonCompletion={findLessonCompletion(currentLesson?.id)}
                lesson={currentLesson}
            />;
            case 'Quiz': return <QuizLesson
                lesson={currentLesson}
                enrollmentId={enrollmentData?.id}
                lessonCompletion={findLessonCompletion(currentLesson?.id)}
            />;
            default: return <p className="text-red-500">Unsupported lesson type.</p>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-yellow-500"></span>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 md:px-8 py-6">
            {course ? (
                <>
                    <header className="mb-6">
                        <h1 className="text-2xl lg:text-3xl font-bold">{course.name}</h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main lesson content */}
                        <main className="order-1 lg:order-2 bg-base-100 rounded-box shadow min-h-[300px] lg:col-span-2 p-2 md:p-5">
                            {renderLessonContent()}

                            {(currentLesson?.lecture_type === 'Text' || currentLesson?.lecture_type === 'Video') && (
                                <LessonCompletionCheckbox
                                    enrollmentId={enrollmentData?.id}
                                    lessonId={currentLesson?.id}
                                    isCompleted={isLessonCompleted(currentLesson?.id)}
                                    onCompletion={handleLessonCompleted}
                                />

                            )}

                            <div
                                className={`mt-10 text-black rounded-full w-fit p-2 rounded-box cursor-pointer font-bold ${showNotes ? 'bg-red-500' : 'bg-yellow-500'}`}
                                onClick={() => setShowNotes(!showNotes)}
                            >
                                {
                                    showNotes ? (
                                        <span className="flex items-center gap-2">
                                            Hide Note Option <FaEyeSlash className="inline" />
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Show Note Option <FaEye className="inline" />
                                        </span>
                                    )
                                }
                            </div>

                            {
                                showNotes && ((currentLesson.lecture_type === 'Text' || currentLesson.lecture_type === 'Video') ? (
                                    <Notes lesson={currentLesson} />
                                ) : (
                                    <div className='flex justify-center items-center gap-2 font-bold text-2xl mt-10 text-gray-500'>
                                        <MdDoDisturb /> Notes not allowed for this lecture.
                                    </div>
                                ))
                            }

                        </main>

                        {/* Sidebar lesson list */}
                        <aside className="order-2 lg:order-1 bg-base-200 rounded-lg shadow p-4">
                            <h2 className="text-xl font-bold mb-4">Lessons</h2>
                            <div className="space-y-4">
                                {course.modules.map((module, idx) => (
                                    <div key={module.id} className="collapse collapse-arrow bg-base-100 rounded-box">
                                        <input type="checkbox" defaultChecked={module.lessons.some(lesson => lesson.id === currentLesson?.id)} />
                                        <div className="collapse-title text-lg font-bold">
                                            {idx + 1}. {module.title}
                                        </div>
                                        <div className="collapse-content p-0">
                                            {module.lessons.length === 0 ? (
                                                <p className="text-gray-400 italic px-4 py-2">No lessons added.</p>
                                            ) : (
                                                <ul className="pl-4 space-y-2 py-2">
                                                    {module.lessons.map((lesson) => (
                                                        <li
                                                            key={lesson.id}
                                                            onClick={() => fetchLessonDetails(lesson)}
                                                            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition hover:bg-gray-600 ${currentLesson?.id === lesson.id ? 'bg-gray-700 text-yellow-500' : ''}`}
                                                        >
                                                            {getIcon(lesson.lecture_type)}
                                                            <span className="text-sm font-bold">{lesson.title}</span>

                                                            {isLessonCompleted(lesson.id) && (
                                                                <MdCheckCircle className="text-green-500 text-lg ml-auto" />
                                                            )}

                                                            {!lesson.is_published && (
                                                                <span className="badge badge-warning text-xs ml-2">
                                                                    Unpublished
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">No course data found.</div>
            )}
        </section>
    );
};

export default MyLearning;
