import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { HashLink } from "react-router-hash-link";
import MyCourseCard from "../components/CourseComponents/MyCourseCard";
import AnnouncementCard from "../components/CourseComponents/AnnouncementCard";


const MyCourses = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [courses, setCourses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch recent announcements
        api.get("/api/core/announcement/recent/")
            .then((res) => setAnnouncements(res.data))
            .catch((err) => console.error("Error fetching announcements", err));

        // Fetch user course summary
        api.get("/api/account/mdshakib007/summary/")
            .then((res) => setCourses(res.data))
            .catch((err) => console.error("Error fetching courses", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
            {/* Announcements Section */}
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">Recent Announcements</h2>
                {announcements.length === 0 ? (
                    <div className="text-center text-gray-300">No recent announcements available.</div>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement) => (
                            <AnnouncementCard key={announcement.id} announcement={announcement}/>
                        ))}
                    </div>
                )}
            </section>

            {/* User's Courses Section */}
            <section className="mt-24">
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
