import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from '../../api/axiosInstance'
import toast from 'react-hot-toast';
import Post from './Post';
import AnnouncementCard from '../CourseComponents/AnnouncementCard';


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    const fetchPosts = async (postType = '') => {
        try {
            const response = await api.get(`/api/discussion/post/list/?post_type=${postType}&access_type=Public&paginated=true`, {
                params: {
                    post_type: postType || undefined,
                    access_type: 'Public',
                    paginated: true,
                },
            });
            setPosts(response.data.results);
        } catch (error) {
            toast.error('Failed to fetch posts');
        }
    };

    useEffect(() => {
        fetchPosts();

        //fetch announcements
        api.get("/api/core/announcement/recent/")
            .then((res) => setAnnouncements(res.data))
            .catch((err) => console.error("Error fetching announcements", err));
    }, []);

    console.log(posts);

    return (
        <div className='container mx-auto px-4'>
            <Header onFilterChange={fetchPosts} />

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
                <section className="order-2 md:order-1">
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
                </section>
            </div>
        </div>
    );
};

export default Posts;
