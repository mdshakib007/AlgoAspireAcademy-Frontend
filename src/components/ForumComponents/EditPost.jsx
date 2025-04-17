import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import { useLocation } from 'react-router-dom';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';


const EditPost = () => {
    const location = useLocation();
    const { postId } = location.state;
    const [postData, setPostData] = useState(null);

    const fetchPostDetails = async () => {
        try {
            const postRes = await api.get(`/api/discussion/post/details/${postId}/`);
            setPostData(postRes?.data);
        } catch {
            toast.error("An error occurred");
            return;
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, []);

    console.log(postData);
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="bg-gray-900 rounded-box max-w-4xl mx-auto p-6 border border-gray-700">
                <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Edit Your Post</h2>
                <PostForm initialData={postData}/>
            </div>
        </div>
    );
};

export default EditPost;
