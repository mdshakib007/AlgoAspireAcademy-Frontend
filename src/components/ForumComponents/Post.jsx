import React, { useState, useContext } from 'react';
import { BiWorld, BiUpvote } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";
import { handleVote, copyLink } from '../../utils/postActions';
import { HashLink } from 'react-router-hash-link';
import {
    MdOutlineStickyNote2,
    MdOutlineFeedback,
    MdEdit,
    MdOutlineCampaign,
    MdOutlineSchool,
    MdMoreVert,
    MdOutlineReport,
    MdDeleteOutline
} from 'react-icons/md';
import { LuFileQuestion } from "react-icons/lu";
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/postActions';


const postTypeStyles = {
    note: {
        icon: <MdOutlineStickyNote2 size={16} />,
        className: 'bg-blue-500 text-white'
    },
    question: {
        icon: <LuFileQuestion size={16} />,
        className: 'bg-purple-500 text-white'
    },
    feedback: {
        icon: <MdOutlineFeedback size={16} />,
        className: 'bg-green-500 text-white'
    },
    editorial: {
        icon: <MdEdit size={16} />,
        className: 'bg-pink-500 text-white'
    },
    announcement: {
        icon: <MdOutlineCampaign size={16} />,
        className: 'bg-red-500 text-white'
    },
    tutorial: {
        icon: <MdOutlineSchool size={16} />,
        className: 'bg-yellow-500 text-black'
    }
};

const Post = ({ post, fetchPosts }) => {
    const { user } = useContext(AuthContext);
    const [totalVotes, setTotalVotes] = useState(post?.vote_count);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await api.delete(`/api/discussion/post/delete/${post.id}/`)
            toast.success("Post deleted successfully");
            fetchPosts();
        }
        catch {
            toast.error("An error occurred");
        }
    }

    const handleEdit = () => {
        navigate('/forum/edit-post', {
            state: {
                postId: post.id
            }
        });
    };

    const handleReport = () => {
        // IT WILL  implement later by me
    }

    const toggleVote = async () => {
        if (!user) return toast.error("You must be logged in to vote.");

        try {
            const voteRes = await handleVote(post.id);

            if (voteRes.success === "Vote added!") {
                toast.success("Vote added!");
                setTotalVotes(totalVotes + 1);
            } else if (voteRes.success === "Vote removed!") {
                toast.success("Vote removed!");
                setTotalVotes(totalVotes - 1);
            } else {
                toast("Unknown response");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    return (
        <div className='bg-gray-700 rounded-box shadow-md shadow-gray-900 flex flex-col h-full'>
            <div className='flex justify-between items-center p-3'>
                <HashLink className='flex gap-4 items-center' to={`/profile/${post.username}#`}>
                    <img src={post.user_image || '/default-user.png'} alt={post.username} className='h-14 w-14 rounded-full' />
                    <div>
                        <div className='flex items-center gap-2'>
                            <h4 className='text-sm md:text-lg font-bold'>{post.username}</h4>
                            <div className="flex items-center gap-2 mb-2">
                                {post.post_type && (
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${postTypeStyles[post.post_type]?.className}`}>
                                        {postTypeStyles[post.post_type]?.icon}
                                        {post.post_type.charAt(0).toUpperCase() + post.post_type.slice(1)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className='text-xs md:text-sm text-gray-300 flex items-center gap-1'>
                            {formatDate(post.created_at)} • <BiWorld />
                        </p>
                    </div>
                </HashLink>
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="cursor-pointer text-lg md:text-xl">
                            <MdMoreVert />
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-42 text-sm md:text-lg">
                            {
                                post.username === user?.username &&
                                <>
                                    <li>
                                        <div onClick={handleEdit} >
                                            <MdEdit /> Edit
                                        </div>
                                    </li>
                                    <li>
                                        <div onClick={handleDelete} >
                                            <MdDeleteOutline /> Delete
                                        </div>
                                    </li>
                                </>
                            }
                            <li>
                                <div onClick={() => copyLink(`https://algoaspire-academy.vercel.app/forum/post/${post.id}`)} >
                                    <PiShareFatLight /> Share
                                </div>
                            </li>
                            <li>
                                <div onClick={handleReport} >
                                    <MdOutlineReport /> Report
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <HashLink className="cursor-pointer hover:text-yellow-500 px-3" to={`/forum/post/${post.id}#`}>
                <h1 className='text-2xl md:text-3xl font-bold'>{post.title}</h1>
            </HashLink>

            <div className='px-3 text-gray-300 text-sm mt-5'>
                <p>{totalVotes} Votes • {post.comment_count} Comments</p>
            </div>

            <div className='flex justify-between items-center m-3 border-y border-black py-2 text-gray-300'>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={toggleVote}
                >
                    <BiUpvote /> {totalVotes} Votes
                </button>
                <HashLink to={`/forum/post/${post.id}#`}>
                    <button
                        className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    >
                        <FaRegCommentAlt /> {post.comment_count} Comment
                    </button>
                </HashLink>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={() => copyLink(`https://algoaspire-academy.vercel.app/forum/post/${post.id}`)}
                >
                    <PiShareFatLight /> Share
                </button>
            </div>
        </div>
    );
};

export default Post;