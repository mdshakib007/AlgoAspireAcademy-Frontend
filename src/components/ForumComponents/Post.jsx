import React, { useState, useContext } from 'react';
import { BiWorld, BiUpvote } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { handleVote, copyLink } from '../../utils/postActions';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import {
    MdOutlineStickyNote2,
    MdOutlineFeedback,
    MdEdit,
    MdOutlineCampaign,
    MdOutlineSchool
} from 'react-icons/md';
import { LuFileQuestion } from "react-icons/lu";
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';


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

const Post = ({ post }) => {
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    const {
        id, title, lesson, post_type,
        vote_count, comment_count,
        created_at, username, user_image, views
    } = post;

    const [totalVotes, setTotalVotes] = useState(vote_count);

    const handleRedirect = () => {
        navigate(`/forum/post/${id}`);
    };

    const toggleVote = async () => {
        if (!user) return toast.error("You must be logged in to vote.");

        try {
            const voteRes = await handleVote(id);
            
            if (voteRes.success === "Vote added!") {
                toast.success("Vote added!");
                setTotalVotes(totalVotes + 1);
            } else if (voteRes.success === "Vote removed!") {
                toast.success("Vote removed!");
                setTotalVotes(totalVotes - 1);
            } else {
                toast("Unknown response");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred");
        }
    };

    return (
        <div className='bg-gray-700 rounded-box shadow-md shadow-gray-900 flex flex-col h-full'>
            <div className='flex justify-between items-center p-3'>
                <HashLink className='flex gap-4 items-center' to={`/profile/${username}#`}>
                    <img src={user_image || '/default-user.png'} alt={username} className='h-14 w-14 rounded-full' />
                    <div>
                        <div className='flex items-center gap-2'>
                            <h4 className='text-lg font-bold'>{username}</h4>
                            <div className="flex items-center gap-2 mb-2">
                                {post_type && (
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${postTypeStyles[post_type]?.className}`}>
                                        {postTypeStyles[post_type]?.icon}
                                        {post_type.charAt(0).toUpperCase() + post_type.slice(1)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className='text-sm text-gray-300 flex items-center gap-1'>
                            {created_at.slice(0, 10)} • <BiWorld />
                        </p>
                    </div>
                </HashLink>
                <p className='flex items-center gap-2 text-gray-300 tooltip tooltip-warning' data-tip='Total Reads'>
                    <CiRead /> {views}
                </p>
            </div>

            <div className="cursor-pointer hover:text-yellow-500 px-3" onClick={handleRedirect}>
                <h1 className='text-2xl md:text-3xl font-bold'>{title}</h1>
            </div>

            <div className='px-3 text-gray-300 text-sm mt-5'>
                <p>{totalVotes} Votes • {comment_count} Comments</p>
            </div>

            <div className='flex justify-between items-center m-3 border-y border-black py-2 text-gray-300'>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={toggleVote}
                >
                    <BiUpvote /> {totalVotes} Votes
                </button>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={handleRedirect}
                >
                    <FaRegCommentAlt /> {comment_count} Comment
                </button>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={() => copyLink(`https://algoaspire-academy.vercel.app/forum/post/${id}`)}
                >
                    <PiShareFatLight /> Share
                </button>
            </div>
        </div>
    );
};

export default Post;