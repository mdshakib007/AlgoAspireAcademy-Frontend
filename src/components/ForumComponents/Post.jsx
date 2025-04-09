import React, { useState } from 'react';
import { BiWorld } from "react-icons/bi";
import { PiHandsClapping, PiShareFatLight } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { handleVote, copyLink } from '../../utils/postActions';
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { HashLink } from 'react-router-hash-link';


const Post = ({ post }) => {
    const {
        id, title, image, lesson, post_type,
        tags, vote_count, comment_count,
        created_at, user, username, user_image, views
    } = post;

    const [totalVotes, setTotalVotes] = useState(vote_count);

    const handleRedirect = () => {
    };

    return (
        <div className='bg-gray-700 rounded-box shadow-md shadow-gray-900 flex flex-col h-full'>
            <div className='flex justify-between items-center p-3'>
                <HashLink className='flex gap-4 items-center' to={`/profile/${username}#`}>
                    <img src={user_image || '/default-user.png'} alt={username} className='h-14 w-14 rounded-full' />
                    <div>
                        <h4 className='text-lg font-bold'>{username}</h4>
                        <p className='text-sm text-gray-300 flex items-center gap-1'>
                            {created_at.slice(0, 10)} • <BiWorld />
                        </p>
                    </div>
                </HashLink>
                <p className='flex items-center gap-2 text-gray-300 tooltip tooltip-warning' data-tip='Total Reads'>
                    <CiRead /> {views}
                </p>
            </div>

            <div className="cursor-pointer hover:text-yellow-500" onClick={handleRedirect}>
                <h1 className='text-2xl md:text-4xl font-bold p-3'>{title}</h1>
            </div>

            <div className='px-3 text-gray-300 text-sm mt-5'>
                <p>{totalVotes} Votes • {comment_count} Comments</p>
            </div>

            <div className='flex justify-between items-center m-3 border-y border-black py-2 text-gray-300'>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={handleVote}
                >
                    <BiUpvote /> {totalVotes} Votes
                </button>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                >
                    <FaRegCommentAlt /> {comment_count} Comment
                </button>
                <button
                    className='flex-1 flex justify-center items-center btn btn-outline border-none text-sm md:text-lg px-2 py-1'
                    onClick={() => copyLink('link.')}
                >
                    <PiShareFatLight /> Share
                </button>
            </div>
        </div>
    );
};

export default Post;