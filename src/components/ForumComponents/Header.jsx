import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
    MdOutlineStickyNote2,
    MdOutlineFeedback,
    MdEdit,
    MdOutlineCampaign,
    MdOutlineSchool,
    MdCheck
} from 'react-icons/md';
import { LuFileQuestion } from "react-icons/lu";


const postTypes = [
    { value: '', label: 'All', icon: <MdCheck size={20} />},
    { value: 'note', label: 'Note', icon: <MdOutlineStickyNote2 size={20} /> },
    { value: 'question', label: 'Question', icon: <LuFileQuestion size={20} /> },
    { value: 'feedback', label: 'Feedback', icon: <MdOutlineFeedback size={20} /> },
    { value: 'editorial', label: 'Editorial', icon: <MdEdit size={20} /> },
    { value: 'announcement', label: 'Announcement', icon: <MdOutlineCampaign size={20} /> },
    { value: 'tutorial', label: 'Tutorial', icon: <MdOutlineSchool size={20} /> },
];

const Header = ({ onFilterChange }) => {
    const [activeType, setActiveType] = useState('');

    const handleFilterClick = (type) => {
        setActiveType(type);
        onFilterChange(type);
    };

    return (
        <div className="w-full px-4 md:px-8 py-6">
            <div className="flex flex-wrap items-center gap-2">
                {postTypes.map((type) => (
                    <button
                        key={type.value}
                        onClick={() => handleFilterClick(type.value)}
                        className={clsx(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm md:text-lg lg:text-lg transition font-bold cursor-pointer',
                            activeType === type.value
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                        )}
                    >
                        {type?.icon}
                        <span>{type.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
