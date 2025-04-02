import React, { useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileSkeleton from "./ProfileSkeleton";
import LoadUsername from '../Common/LoadUsername';
import { FaPen, FaLinesLeaning } from "react-icons/fa6";
import GlowingButton from "../Common/GlowingButton";
import { MdDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoTrophyOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';


const Header = () => {
    const { user, fetchUser, logout } = useContext(AuthContext);
    console.log(user);

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

    const loadAchievements = () => {

    }

    const loadBadges = () => {

    }

    const values = [
        { date: '2025-12-01', count: 1 },
        { date: '2025-12-02', count: 2 },
        { date: '2025-12-03', count: 3 },
        { date: '2025-12-04', count: 2 },
        { date: '2025-12-05', count: 4 },
        // ... add more data as needed
    ];

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
                <LoadUsername></LoadUsername>
                <p className='text-2xl md:text-3xl text-gray-300 font-bold'>{user.full_name}</p>
            </div>
            <div className='flex gap-5 justify-center mt-5'>
                <Link to='/edit-profile'><GlowingButton><FaPen />Edit Profile</GlowingButton></Link>
                <Link to='/dashboard'><GlowingButton><MdDashboard />Dashboard</GlowingButton></Link>
            </div>

            {/* tabs */}
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-box tabs-lg mt-10 overflow-auto">
                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" defaultChecked />
                    <FaLinesLeaning />
                    Summary
                </label>
                <div className="tab-content bg-gray-700 p-6">Tab content 1</div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <IoTrophyOutline />
                    Achievements
                </label>
                <div className="tab-content bg-gray-700 p-6">Tab content 2</div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <SlBadge />
                    Badges
                </label>
                <div className="tab-content bg-gray-700 p-6">Tab content 3</div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <IoMdInformationCircleOutline />
                    Info
                </label>
                <div className="tab-content bg-gray-700 p-6">Tab content 4</div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <SlBadge />
                    Badges
                </label>
                <div className="tab-content bg-gray-700 p-6">Tab content 5</div>
            </div>

            {/* activity heatmap */}
            <div className="mx-auto mt-10">
                <h1 className='text-2xl text-gray-300 mb-5'>312 activity in the last year</h1>
                <div className='border-2 rounded-box p-5 border-gray-700'>
                    <CalendarHeatmap
                        startDate={new Date('2025-01-01')}
                        endDate={new Date('2025-12-31')}
                        values={values}
                        showWeekdayLabels={true}
                        gutterSize={5}
                        classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            // You can customize your color scale based on the count
                            if (value.count >= 4) {
                                return 'color-scale-4';
                            } else if (value.count === 3) {
                                return 'color-scale-3';
                            } else if (value.count === 2) {
                                return 'color-scale-2';
                            } else if (value.count === 1) {
                                return 'color-scale-1';
                            }
                            return 'color-empty';
                        }}
                        // Optional: customize tooltip text for each cell
                        titleForValue={(value) =>
                            value ? `${value.date} has count: ${value.count}` : 'No data'
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default Header;