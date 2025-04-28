import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import MyCourseCard from "../components/CourseComponents/MyCourseCard";
import AnnouncementCard from "../components/CourseComponents/AnnouncementCard";


const MyCourses = () => {
    const [courses, setCourses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user course summary
        api.get("/api/account/mdshakib007/summary/")
            .then((res) => setCourses(res.data))
            .catch((err) => console.error("Error fetching courses", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
            {/* User's Courses Section */}
            <section>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">Running Course</h2>

                {loading ? (
                    <div className="text-center text-gray-300">Loading courses...</div>
                ) : (
                    <>
                        {/* Running Course */}
                        {courses.running_course && (
                            <div>
                                <MyCourseCard
                                    course={courses.running_course}
                                    isRunningCourse={true}
                                />
                            </div>
                        )}

                        {/* Completed Courses */}
                        {courses.completed_courses && courses.completed_courses.length > 0 && (
                            <div className="mt-24">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">Completed Courses</h3>
                                <div className="flex flex-col gap-20">
                                    {courses.completed_courses.map((course) => (
                                        <MyCourseCard
                                            key={course.id}
                                            course={course}
                                            isRunningCourse={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default MyCourses;
