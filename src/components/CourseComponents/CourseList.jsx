import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import CommonButton from "../Common/CommonButton";

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api
            .get("/api/course/list/?is_published=true&paginated=false")
            .then((res) => setCourses(res.data))
            .catch((err) => console.error("Error fetching courses", err));
    }, []);

    return (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 gradient-text">
                    Explore All Courses
                </h1>

                {courses.length === 0 ? (
                    <div className="text-center text-gray-300">No courses available.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="card glass shadow-xl hover:shadow-2xl"
                            >
                                <figure className="aspect-video">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-full h-full object-cover rounded-t-xl"
                                    />
                                </figure>
                                <div className="card-body text-neutral-content p-5">
                                    <h2 className="card-title text-2xl">{course.name}</h2>
                                    <p className="text-sm mt-1">
                                        <span className="opacity-70">By </span>
                                        <span className="font-bold gradient-text cursor-pointer">{course.instructor_name}</span>
                                    </p>
                                    <div className="text-right">
                                        <Link to={`/course/${course.id}-${course.slug}`}>
                                            <CommonButton>View Course</CommonButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CourseList;
