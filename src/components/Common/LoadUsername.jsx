import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MdVerified } from "react-icons/md";


const LoadUsername = () => {
    const { user } = useContext(AuthContext);

    return (
        <p>
            <p
                className='text-yellow-500 text-xl md:text-2xl flex items-center gap-2'
            >
                @{user.username} {
                    user.is_verified && <span
                        className='tooltip tooltip-warning'
                        data-tip='Verified User'
                    ><MdVerified />
                    </span>
                }
            </p>
        </p>
    );
};

export default LoadUsername;