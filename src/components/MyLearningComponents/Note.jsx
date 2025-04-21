import React from 'react';
import { BiWorld } from "react-icons/bi";
import { HashLink } from 'react-router-hash-link';


const Note = ({ note, showNote }) => {
    // Format ISO timestamp into “Apr 9, 2025” style
    const formatDate = (isoString) => {
        const d = new Date(isoString);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className='bg-gray-800 rounded-box flex flex-col h-full p-3'>
            <div className='flex justify-between items-center'>
                <HashLink className='flex gap-4 items-center' to={`/profile/${note.username}#`}>
                    <img src={note.user_image || '/default-user.png'} alt={note.username} className='h-12 w-12 rounded-full' />
                    <div>
                        <h4 className='text-sm md:text-lg font-bold'>{note.username}</h4>
                        <p className='text-xs md:text-sm text-gray-300 flex items-center gap-1'>
                            {formatDate(note.created_at)} • <BiWorld />
                        </p>
                    </div>
                </HashLink>
            </div>

            <div onClick={()=>showNote(note.id)}>
                <h1 className='cursor-pointer hover:text-yellow-500 py-3 text-xl md:text-2xl font-bold'>{note.title}</h1>
            </div>

            <div className='text-gray-300 text-sm'>
                <p>{note.vote_count} Votes • {note.comment_count} Comments</p>
            </div>
        </div>
    );
};

export default Note;
