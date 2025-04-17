import React from 'react';
import PostForm from './PostForm';

const CreatePost = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="bg-gray-900 rounded-box max-w-4xl mx-auto p-6 border border-gray-700">
                <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Create a New Post</h2>
                <PostForm />
            </div>
        </div>
    );
};

export default CreatePost;
