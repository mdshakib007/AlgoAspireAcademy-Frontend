import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from '../../api/axiosInstance'
import toast from 'react-hot-toast';
import Post from './Post';
import AnnouncementCard from '../CourseComponents/AnnouncementCard';
import CommonButton from '../Common/CommonButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { scrollToTop } from '../../utils/scrollToTop';


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [totalPostCount, setTotalPostCount] = useState(0);
    const [searchTitle, setSearchTitle] = useState('');
    const [shouldScroll, setShouldScroll] = useState(false);


    const fetchPosts = async (url = `/api/discussion/post/list/`, postType = '', title = '') => {
        try {
            const response = await api.get(url, {
                params: {
                    post_type: postType || undefined,
                    access_type: 'Public',
                    paginated: true,
                    title: title || undefined,
                },
            });
            setPosts(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
            setTotalPostCount(response.data.count);
        } catch (error) {
            toast.error('Failed to fetch posts');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts(`/api/discussion/post/list/`, '', searchTitle);
    };

    const handleNext = () => {
        if (nextPage) {
            fetchPosts(nextPage, '', searchTitle);
            setShouldScroll(true);
            toast.success("Switched to next page");
        }
    };

    const handlePrevious = () => {
        if (previousPage) {
            fetchPosts(previousPage, '', searchTitle);
            setShouldScroll(true);
            toast.success("Switched to previous page");
        }
    };

    useEffect(() => {
        if (shouldScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShouldScroll(false);
        }
    }, [posts]);


    useEffect(() => {
        fetchPosts();

        //fetch announcements
        api.get("/api/core/announcement/recent/")
            .then((res) => setAnnouncements(res.data))
            .catch((err) => console.error("Error fetching announcements", err));
    }, []);

    return (
        <div className='container mx-auto px-4'>
            <Header onFilterChange={(postType) => fetchPosts(`/api/discussion/post/list/`, postType, searchTitle)} />

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="my-6 flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search posts by title..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <CommonButton type="submit"><FaMagnifyingGlass />Search</CommonButton>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Announcements Section */}
                <section className="order-1 md:order-2 h-76 md:h-full overflow-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">Recent Announcements</h2>
                    {announcements.length === 0 ? (
                        <div className="text-center text-gray-300">No recent announcements available.</div>
                    ) : (
                        <div className="space-y-4">
                            {announcements.map((announcement) => (
                                <AnnouncementCard key={announcement.id} announcement={announcement} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Posts Section */}
                <section className="order-2 lg:order-1">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">Posts</h2>
                    {posts.length === 0 ? (
                        <div className="text-center text-gray-300">No posts available.</div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                    <div className='flex justify-between items-center gap-4 my-5'>
                        <CommonButton onClick={handlePrevious} disabled={!previousPage}>
                            <FaArrowLeft /> Previous
                        </CommonButton>

                        <p className="text-gray-400 text-sm">{posts.length} / {totalPostCount}</p>

                        <CommonButton onClick={handleNext} disabled={!nextPage}>
                            Next <FaArrowRight />
                        </CommonButton>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Posts;
