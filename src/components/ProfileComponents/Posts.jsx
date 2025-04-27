import React, { useEffect, useState } from 'react';
import Post from '../ForumComponents/Post';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import CommonButton from '../Common/CommonButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';


const Posts = ({ user, currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [totalPostCount, setTotalPostCount] = useState(0);
    const [shouldScroll, setShouldScroll] = useState(false);

    const access = user?.username === currentUser?.username ? undefined : 'public';

    const fetchPosts = async (url = `/api/discussion/post/list/`, postType = '', title = '') => {
        try {
            const response = await api.get(url, {
                params: {
                    post_type: postType || undefined,
                    access_type: access,
                    paginated: true,
                    title: title || undefined,
                    user_id: currentUser?.id,
                },
            });
            setPosts(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
            setTotalPostCount(response.data.count);
        } catch {
            toast.error('Failed to fetch posts');
        }
    };

    const handleNext = () => {
        if (nextPage) {
            fetchPosts(nextPage);
            setShouldScroll(true);
            toast.success("Switched to next page");
        }
    };

    const handlePrevious = () => {
        if (previousPage) {
            fetchPosts(previousPage);
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
    }, []);

    return (
        <div className='my-10'>
            <h3 className='text-center text-2xl md:text-4xl font-bold gradient-text mb-10'>Recent Posts</h3>
            {posts.length === 0 ? (
                <div className="text-center text-gray-300">No posts available.</div>
            ) : (
                <div className="flex flex-col gap-2 items-center">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} fetchPosts={fetchPosts} />
                    ))}
                </div>
            )}
            <div className="max-w-3xl mx-auto">
                <div className='flex justify-between items-center my-5'>
                    <CommonButton onClick={handlePrevious} disabled={!previousPage}>
                        <FaArrowLeft />
                    </CommonButton>

                    <p className="text-gray-400 text-sm">{posts.length} / {totalPostCount}</p>

                    <CommonButton onClick={handleNext} disabled={!nextPage}>
                        Next <FaArrowRight />
                    </CommonButton>
                </div>
            </div>
        </div>
    );
};

export default Posts;