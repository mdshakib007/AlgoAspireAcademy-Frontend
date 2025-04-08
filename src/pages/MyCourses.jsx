import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { HashLink } from "react-router-hash-link";
import CommonButton from "../components/Common/CommonButton";

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
                            <div
                                key={announcement.id}
                                className="border p-3 rounded-box border-gray-500"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="h-20 w-20 p-2 rounded-box"
                                    >
                                        <img
                                            src="/announcement.png"
                                            alt="Announcement"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold">{announcement.title}</h3>
                                        <p className="text-gray-300">
                                            {new Date(announcement.created_at).toLocaleDateString()}
                                        </p>

                                        <HashLink
                                            to={`/announcement/${announcement.id}#`}
                                            className="text-yellow-500 hover:underline mt-1 inline-block transition duration-150"
                                        >
                                            View Details
                                        </HashLink>
                                    </div>
                                </div>
                            </div>

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                                <div className="card glass shadow-xl hover:shadow-2xl">
                                    <figure className="aspect-video">
                                        <img
                                            src={courses.running_course.image}
                                            alt={courses.running_course.name}
                                            className="w-full h-full object-cover rounded-t-xl"
                                        />
                                    </figure>
                                    <div className="card-body text-neutral-content p-5">
                                        <h2 className="card-title text-2xl">{courses.running_course.name}</h2>
                                        <div className="text-right">
                                            <HashLink
                                                to={`/course/${courses.running_course.id}-${courses.running_course.slug}#`}
                                            >
                                                <CommonButton>Continue Course</CommonButton>
                                            </HashLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Completed Courses */}
                        {courses.completed_courses && courses.completed_courses.length > 0 && (
                            <div className="mt-24">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">Completed Courses</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {courses.completed_courses.map((course) => (
                                        <div key={course.id} className="card glass shadow-xl hover:shadow-2xl">
                                            <figure className="aspect-video">
                                                <img
                                                    src={course.image}
                                                    alt={course.name}
                                                    className="w-full h-full object-cover rounded-t-xl"
                                                />
                                            </figure>
                                            <div className="card-body text-neutral-content p-5">
                                                <h2 className="card-title text-2xl">{course.name}</h2>
                                                <div className="text-right">
                                                    <HashLink to={`/course/${course.id}-${course.slug}#`}>
                                                        <CommonButton>View Course</CommonButton>
                                                    </HashLink>
                                                </div>
                                            </div>
                                        </div>
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
