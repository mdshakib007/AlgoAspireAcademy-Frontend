import React from 'react';
import { MdVerified } from "react-icons/md";


const LoadUsername = ({ currentUser }) => {
    return (
        <>
            <h3
                className='text-yellow-500 text-xl md:text-2xl flex items-center gap-2'
            >
                @{currentUser.username} {
                    currentUser.is_verified && <span
                        className='tooltip tooltip-warning'
                        data-tip='Verified User'
                    ><MdVerified />
                    </span>
                }
            </h3>
        </>
    );
};

export default LoadUsername;