import React, { useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileSkeleton from "../ProfileComponents/ProfileSkeleton";
import LoadUsername from '../Common/LoadUsername';
import { FaPen, FaLinesLeaning } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import General from './General';
import Others from './Others';
import Social from './Social';


const Header = () => {
    const { user, fetchUser, logout } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    // if user data is null then show skeleton when fetching.
    if (!user) {
        return <ProfileSkeleton />;
    }

    const profilePhotoChange = () => {

    }

    return (
        <section className='container mx-auto px-2'>
            <div className='flex flex-col items-center'>
                <div>
                    <img
                        src={user.profile_picture ? user.profile_picture : '/default-user.png'}
                        alt={user.username}
                        className='h-40 md:h-52 w-40 md:w-52 rounded-full object-cover p-2 border-3 border-gray-700'
                    />
                    <button
                        className='relative left-30 md:left-40 bottom-15 text-2xl text-gray-300 bg-gray-700 p-2 rounded-full cursor-pointer'
                        onClick={profilePhotoChange}
                    >
                        <FaPen />
                    </button>
                </div>
                <LoadUsername currentUser={user}></LoadUsername>
                <p className='text-lg md:text-xl text-gray-300'>{user.email}</p>
            </div>

            {/* tabs */}
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-box tabs-lg my-10 overflow-auto">
                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" defaultChecked />
                    <IoMdInformationCircleOutline />
                    About
                </label>
                <div className="tab-content bg-gray-700 p-6">
                    <General></General>
                </div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <FaRegUserCircle />
                    Social
                </label>
                <div className="tab-content bg-gray-700 p-6">
                    <Social></Social>
                </div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <FaLinesLeaning />
                    Others
                </label>
                <div className="tab-content bg-gray-700 p-6">
                    <Others></Others>
                </div>
            </div>

            {/* modal  */}

        </section>
    );
};

export default Header;