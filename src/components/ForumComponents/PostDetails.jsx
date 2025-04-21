import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { BiWorld, BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { CiRead } from "react-icons/ci";
import {
    MdOutlineStickyNote2, MdOutlineFeedback, MdEdit,
    MdOutlineCampaign, MdOutlineSchool,
    MdMoreVert, MdOutlineReport, MdDeleteOutline
} from 'react-icons/md';
import { LuFileQuestion } from "react-icons/lu";
import { handleVote, handleComment, copyLink } from '../../utils/postActions';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import CommonButton from '../Common/CommonButton';
import CustomMarkdown from '../Common/CustomMarkdown';
import { AuthContext } from '../../context/AuthContext';


const postTypeStyles = {
    note: { icon: <MdOutlineStickyNote2 size={16} />, className: 'bg-blue-500 text-white' },
    question: { icon: <LuFileQuestion size={16} />, className: 'bg-purple-500 text-white' },
    feedback: { icon: <MdOutlineFeedback size={16} />, className: 'bg-green-500 text-white' },
    editorial: { icon: <MdEdit size={16} />, className: 'bg-pink-500 text-white' },
    announcement: { icon: <MdOutlineCampaign size={16} />, className: 'bg-red-500 text-white' },
    tutorial: { icon: <MdOutlineSchool size={16} />, className: 'bg-yellow-500 text-black' }
};

const PostDetails = ({ postId: propPostId }) => {
    const { user } = useContext(AuthContext);
    const { postId: paramPostId } = useParams();
    const postId = propPostId || paramPostId;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [totalVotes, setTotalVotes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [totalComments, setTotalComments] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    const loadPost = async () => {
        try {
            const res = await api.get(`/api/discussion/post/details/${postId}/`);
            setPost(res.data);
            setTotalVotes(res.data.vote_count);
            setLoading(false);
        } catch (err) {
            toast.error("Failed to load post.");
            console.error(err);
        }
    };

    const loadComments = async (url = `/api/discussion/comment/list/?post_id=${postId}&paginated=true`) => {
        try {
            const res = await api.get(url);
            setTotalComments(res.data.count);
            setComments(res.data);  // contains {count, next, previous, results}
            setNext(res.data.next);
            setPrevious(res.data.previous);
        } catch (err) {
            toast.error("Failed to load comments.");
            console.error(err);
        }
    };

    const submitComment = async () => {
        if (!user) return toast.error("You must be logged in to comment.");
        if (!commentInput.trim()) return toast.error("Empty comment box");

        try {
            const response = await handleComment(postId, commentInput);
            setComments((prevComments) => ({
                ...prevComments,
                count: prevComments.count + 1,
                results: [response, ...prevComments.results]
            }));
            setTotalComments(totalComments + 1);
            setCommentInput('');
            toast.success("Comment added!");
        } catch {
            toast.error("Failed to comment.");
        }
    };

    const toggleVote = async () => {
        if (!user) return toast.error("You must be logged in to vote.");

        try {
            const res = await handleVote(postId);
            if (res.success === "Vote added!") {
                setTotalVotes(prev => prev + 1);
                toast.success("Vote added!");
            } else if (res.success === "Vote removed!") {
                setTotalVotes(prev => prev - 1);
                toast.success("Vote removed!");
            } else {
                toast("Unknown response");
            }
        } catch {
            toast.error("Failed to vote");
        }
    };

    const handleNextPage = () => {
        if (next) {
            loadComments(next);
            toast.success('Showing next comments');
        }
    };
    const handlePrevPage = () => {
        if (previous) {
            loadComments(previous);
            toast.success('Showing previous comments');
        }
    };

    const handleEdit = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditingContent(content);
    };

    const submitEdit = async (commentId) => {
        try {
            const response = await api.put(`/api/discussion/comment/edit/${commentId}/`, {
                content: editingContent
            });
            toast.success("Comment updated");
            setEditingCommentId(null);
            setEditingContent('');

            setComments((prevComments) => {
                const newResults = prevComments.results.map((comment) =>
                    comment.id === commentId ? response.data : comment
                );
                return { ...prevComments, results: newResults };
            });
        } catch {
            toast.error("Failed to update comment");
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await api.delete(`/api/discussion/comment/delete/${commentId}/`);
            toast.success("Comment deleted");

            setComments((prevComments) => {
                const newResults = prevComments.results.filter(
                    (comment) => comment.id !== commentId
                );
                setTotalComments(totalComments - 1);
                return {
                    ...prevComments,
                    count: prevComments.count - 1,
                    results: newResults,
                };
            });
        } catch {
            toast.error("An error occurred");
        }
    };

    const handleReport = (commentId) => {
        console.log(commentId);
    };

    const handleShare = (commentId) => {
        copyLink(`https://algoaspire-academy.vercel.app/forum/post/${postId}/comments/${commentId}`);
    };

    useEffect(() => {
        loadPost();
        loadComments();
    }, [postId]);

    if (loading) return <div className="text-center py-10 text-gray-300">Loading post...</div>;

    const {
        username, user_image, created_at, title,
        body, post_type, views
    } = post;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 text-white">
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
                <HashLink className='flex gap-4 items-center' to={`/profile/${username}#`}>
                    <div className='flex items-center gap-4'>
                        <img src={user_image || '/default-user.png'} className='h-12 w-12 rounded-full' />
                        <div>
                            <h4 className='font-bold text-sm md:text-lg'>{username}</h4>
                            <p className='text-xs md:text-sm text-gray-400 flex items-center gap-2'>
                                {created_at.slice(0, 10)} • <BiWorld />
                            </p>
                        </div>
                    </div>
                </HashLink>
                <p className='flex items-center gap-2 text-sm text-gray-300'><CiRead /> {views}</p>
            </div>

            {/* Post Type Tag */}
            {post_type && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${postTypeStyles[post_type]?.className}`}>
                    {postTypeStyles[post_type]?.icon}
                    {post_type.charAt(0).toUpperCase() + post_type.slice(1)}
                </span>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-4">{title}</h1>

            {/* Body */}
            <CustomMarkdown>{body}</CustomMarkdown>

            {/* Actions */}
            <div className='flex justify-between items-center m-3 border-y border-black py-2 text-gray-300'>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-xs md:text-lg px-2 py-1'
                    onClick={toggleVote}
                >
                    <BiUpvote /> {totalVotes} Votes
                </button>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-xs md:text-lg px-2 py-1'
                >
                    <FaRegCommentAlt /> {totalComments} Comment
                </button>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-xs md:text-lg px-2 py-1'
                    onClick={() => copyLink(`https://algoaspire-academy.vercel.app/forum/post/${postId}`)}
                >
                    <PiShareFatLight /> Share
                </button>
            </div>

            {/* Comment Input */}
            <div className="mb-6">
                <textarea
                    className="w-full bg-gray-700 text-white p-3 rounded-box resize-none outline-none"
                    rows="3"
                    placeholder="Write a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
                <CommonButton onClick={submitComment} >
                    Comment
                </CommonButton>
            </div>

            {/* Comments */}
            <h1 className='my-2 text-lg font-semibold'>
                Showing Comments: {`${comments?.results?.length || 0} / ${totalComments}`}
            </h1>

            <div className="space-y-4">
                {comments?.results?.map((comment, index) => (
                    <div key={index} className="flex items-start gap-3">
                        {/* Avatar */}
                        <HashLink to={`/profile/${comment.username}#`} className="shrink-0">
                            <img
                                src={comment.user_image || '/default-user.png'}
                                alt="User"
                                className="h-8 w-8 rounded-full"
                            />
                        </HashLink>

                        {/* Comment Box */}
                        <div className="bg-gray-700 p-3 rounded-box flex flex-col w-fit">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-sm font-semibold text-yellow-500">
                                    {comment.username}
                                </p>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="cursor-pointer">
                                        <MdMoreVert />
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-32 text-md">
                                        {
                                            comment.username === user?.username &&
                                            <>
                                                <li>
                                                    <div onClick={() => handleEdit(comment.id, comment.content)} >
                                                        <MdEdit /> Edit
                                                    </div>
                                                </li>
                                                <li>
                                                    <div onClick={() => handleDelete(comment.id)} >
                                                        <MdDeleteOutline /> Delete
                                                    </div>
                                                </li>
                                            </>
                                        }
                                        <li>
                                            <div onClick={() => handleShare(comment.id)} >
                                                <PiShareFatLight /> Share
                                            </div>
                                        </li>
                                        <li>
                                            <div onClick={() => handleReport(comment.id)} >
                                                <MdOutlineReport /> Report
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {editingCommentId === comment.id ? (
                                <div>
                                    <textarea
                                        className="bg-gray-800 w-full rounded-box p-2 text-sm text-white resize-none"
                                        rows={2}
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                    />
                                    <div className="flex gap-2 mt-1">
                                        <CommonButton onClick={() => submitEdit(comment.id)}>Save</CommonButton>
                                        <button onClick={() => setEditingCommentId(null)} className="btn btn-outline rounded-full hover:bg-red-600">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-100">{comment.content}</p>
                            )}
                        </div>
                    </div>
                ))}
                {
                    (comments?.results?.length === 0) && (
                        <p className='flex justify-center items-center gap-2 my-10'>
                            <FaRegCommentAlt /> Be the first to comment
                        </p>
                    )
                }

                {/* Pagination */}
                <div className='flex justify-between'>
                    <CommonButton
                        onClick={handlePrevPage}
                        disabled={!previous}
                    >
                        <FaArrowLeft /> Previous
                    </CommonButton>

                    <CommonButton
                        onClick={handleNextPage}
                        disabled={!next}
                    >
                        Next <FaArrowRight />
                    </CommonButton>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
