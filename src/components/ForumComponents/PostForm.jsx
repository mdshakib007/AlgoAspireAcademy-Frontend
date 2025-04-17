import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonButton from '../Common/CommonButton';
import toast from 'react-hot-toast';
import { FaEarthAmericas } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { createPost } from '../../utils/postActions';
import MarkdownEditor from '@uiw/react-markdown-editor';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const postTypes = ['Note', 'Question', 'Feedback', 'Editorial', 'Tutorial'];

const PostForm = ({ initialData }) => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [markdown, setMarkdown] = useState("## Write your post body in Markdown here...");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const postData = {
            lesson: null,
            title: data.title,
            body: markdown,
            post_type: data.post_type.toLowerCase(),
            access: data.access_type.toLowerCase(),
            tags: tags
        };

        try {
            if(initialData && initialData.id){
                await api.put(`/api/discussion/post/edit/${initialData.id}/`, postData);
                toast.success("Post edited successfully!");
                navigate('/forum');
            }
            else{
                await createPost(postData);
                toast.success("Post created successfully!");
                reset();
                setTags([]);
                setTagInput('');
                setMarkdown('## Write your post body in Markdown here...');
                navigate('/forum');
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit post, please try again.");
        }
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const tag = tagInput.trim().toLowerCase();
            const tagRegex = /^[a-z0-9]+([-_][a-z0-9]+)*$/;

            if (!tagRegex.test(tag)) {
                toast.error("Invalid tag format. Use only lowercase letters, numbers, and hyphens.");
                return;
            }

            if (tag.length > 20) {
                toast.error("Tag too long (max 20 characters).");
                return;
            }

            if (!tags.includes(tag)) {
                setTags([...tags, tag]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                access_type: initialData.access?.charAt(0).toUpperCase() + initialData.access.slice(1),
                post_type: initialData.post_type?.charAt(0).toUpperCase() + initialData.post_type.slice(1)
            });

            setMarkdown(initialData.body || '');
            setTags(initialData.tags || []);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Access Type */}
            <div>
                <label className="font-medium text-sm block mb-1">Access</label>
                <div className="flex items-center gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" value="Public" {...register("access_type", { required: true })} className="hidden" />
                        <div className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 
                            ${watch("access_type") === "Public" ? "bg-yellow-500 text-black border-yellow-500" : "bg-gray-700 text-white border-gray-600"}`}>
                            <FaEarthAmericas /> Public
                        </div>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" value="Private" {...register("access_type", { required: true })} className="hidden" />
                        <div className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 
                            ${watch("access_type") === "Private" ? "bg-yellow-500 text-black border-yellow-500" : "bg-gray-700 text-white border-gray-600"}`}>
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

            {/* Body Markdown Editor */}
            <div>
                <label className="font-medium text-sm flex justify-between items-center">
                    Body
                </label>
                <div className="mt-2 border border-gray-600 rounded-md overflow-hidden">
                    <MarkdownEditor
                        value={markdown}
                        onChange={(val) => setMarkdown(val || '')}
                        height="400px"
                        className="dark w-full rounded-md bg-gray-900 text-white"
                    />
                </div>
                {markdown.length < 100 && <p className="text-red-400 text-sm mt-1">Body must be at least 100 characters.</p>}
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

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-6">
                <CommonButton type="submit" className='w-full'>Publish</CommonButton>
            </div>
        </form>
    );
};

export default PostForm;
