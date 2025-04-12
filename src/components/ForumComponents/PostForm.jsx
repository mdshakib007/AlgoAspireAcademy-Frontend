import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CommonButton from '../Common/CommonButton';
import toast from 'react-hot-toast';
import { FaEarthAmericas } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { createPost } from '../../utils/postActions';

const postTypes = ['Note', 'Question', 'Feedback', 'Editorial', 'Tutorial'];

const PostForm = ({ initialData = null, onSubmitCallback = null }) => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        // Initialize default values if editing
        defaultValues: initialData || {}
    });
    const [tags, setTags] = useState(initialData?.tags || []);
    const [tagInput, setTagInput] = useState('');

    // When initialData changes, reset the form fields
    useEffect(() => {
        if (initialData) {
            reset(initialData);
            setTags(initialData.tags || []);
        }
    }, [initialData, reset]);

    const onSubmit = async (data) => {
        const postData = {
            lesson: null, // update if needed
            title: data.title,
            body: data.body,
            post_type: data.post_type.toLowerCase(),
            access: data.access_type.toLowerCase(),
            tags: tags
        };

        try {
            if (onSubmitCallback) {
                // If an update callback is provided, assume editing mode.
                await onSubmitCallback(postData);
                toast.success("Post updated successfully!");
            } else {
                // Otherwise, it's a new post.
                await createPost(postData);
                toast.success("Post created successfully!");
            }
            reset();
            setTags([]);
            setTagInput('');
            document.getElementById('add_post_modal')?.close();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit post, please try again.");
        }
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Access Type (Switch Style) */}
            <div>
                <label className="font-medium text-sm block mb-1">Access</label>
                <div className="flex items-center gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="Public"
                            {...register("access_type", { required: true })}
                            className="hidden"
                            defaultChecked={!initialData || initialData?.access_type?.toLowerCase() === "public"}
                        />
                        <div className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 
                    ${watch("access_type") === "Public" ? "bg-yellow-500 text-black border-yellow-500" : "bg-gray-700 text-white border-gray-600"}
                `}>
                            <FaEarthAmericas /> Public
                        </div>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="Private"
                            {...register("access_type", { required: true })}
                            className="hidden"
                        />
                        <div className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2
                    ${watch("access_type") === "Private" ? "bg-yellow-500 text-black border-yellow-500" : "bg-gray-700 text-white border-gray-600"}
                `}>
                            <FaLock /> Private
                        </div>
                    </label>
                </div>
                {errors.access_type && <p className="text-red-400 text-sm mt-1">Access type is required.</p>}
            </div>

            {/* Title */}
            <div>
                <label className="font-medium text-sm">Title</label>
                <input
                    {...register("title", { required: true, minLength: 10, maxLength: 250 })}
                    type="text"
                    placeholder="Post title"
                    className="input input-bordered w-full bg-gray-800 text-white"
                />
                {errors.title && <p className="text-red-400 text-sm">Title must be between 10 and 250 characters.</p>}
            </div>

            {/* Body */}
            <div>
                <label className="font-medium text-sm">Body</label>
                <textarea
                    {...register("body", { required: true, minLength: 100 })}
                    placeholder="Write your post body..."
                    className="textarea textarea-bordered w-full bg-gray-800 text-white min-h-[150px]"
                />
                {errors.body && <p className="text-red-400 text-sm">Body must be at least 100 characters.</p>}
            </div>

            {/* Post Type */}
            <div>
                <label className="font-medium text-sm">Post Type</label>
                <select
                    {...register("post_type", { required: true })}
                    className="select select-bordered w-full bg-gray-800 text-white"
                >
                    <option value="">Select post type</option>
                    {postTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.post_type && <p className="text-red-400 text-sm">Post type is required.</p>}
            </div>

            {/* Tags Input */}
            <div>
                <label className="font-medium text-sm">Tags (press Enter to add)</label>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Type tag and press Enter"
                    className="input input-bordered w-full bg-gray-800 text-white"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="border border-gray-500 rounded-full px-2 my-2 gap-2 flex items-center">
                            <p className='text-yellow-500'>{tag}</p>
                            <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-xs md:text-sm cursor-pointer">✕</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Button */}
            <div className="flex justify-center items-center mt-6">
                <CommonButton type="submit" className='w-full'>{initialData ? "Update" : "Publish"}</CommonButton>
            </div>
        </form>
    );
};

export default PostForm;
