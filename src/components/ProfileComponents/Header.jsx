import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import ProfileSkeleton from "./ProfileSkeleton";
import LoadUsername from '../Common/LoadUsername';
import { FaPen, FaLinesLeaning } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlowingButton from "../Common/GlowingButton";
import { MdDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoTrophyOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import CommonButton from '../Common/CommonButton';
import axios from 'axios';


const Header = ({ username }) => {
    const { user, fetchUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!user){
            fetchUser();
        }

        if (user?.username === username) {
            // If visiting own profile, set currentUser to logged-in user
            setCurrentUser(user);
            setLoading(false);
        } else {
            // If visiting someone else's profile, fetch the user
            axios.get(`/api/account/user/${username}/`)
                .then((response) => {
                    console.log(response)
                    setCurrentUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    setCurrentUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user, username, fetchUser]);

    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!currentUser) {
        return <p className="text-center text-gray-300 text-3xl">User not found.</p>;
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
                <img
                    src={currentUser.profile_picture ? currentUser.profile_picture : '/default-user.png'}
                    alt={currentUser.username}
                    className='h-40 md:h-52 w-40 md:w-52 rounded-full object-cover p-2 border-3 border-gray-700'
                />
                <LoadUsername currentUser={currentUser}></LoadUsername>
                <p className='text-2xl md:text-3xl text-gray-300 font-bold'>{currentUser.full_name}</p>
            </div>
            {
                user?.username === username &&
                <div className='flex gap-5 justify-center mt-5'>
                    <Link to='/settings'><GlowingButton><FaPen />Edit Profile</GlowingButton></Link>
                    <Link to='/dashboard'><GlowingButton><MdDashboard />Dashboard</GlowingButton></Link>
                </div>
            }

            {/* tabs */}
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
                    About
                </label>
                <div className="tab-content bg-gray-700 p-6">Tab content 4</div>
            </div>

            {/* activity heatmap */}
            <div className="mt-10">
                <h1 className='text-2xl text-gray-300 mb-5'>312 activity in the last year</h1>
                <div className="heatmap-container">
                    <div className='heatmap-wrapper'>
                        <CalendarHeatmap
                            startDate={new Date('2025-01-01')}
                            endDate={new Date('2025-12-31')}
                            values={values}
                            showWeekdayLabels={true}
                            gutterSize={4}
                            classForValue={(value) => {
                                if (!value) return 'color-empty';
                                return `color-scale-${Math.min(value.count, 4)}`;
                            }}
                            titleForValue={(value) => value ? `${value.date} - ${value.count} Activities` : 'No activity'}
                        />
                    </div>
                </div>
            </div>

            {/* my posts */}
            <div className='my-10'>
                <h3 className='text-center text-2xl md:text-4xl font-bold'>Recent Posts</h3>
                <div className='flex justify-between'>
                    <CommonButton><FaArrowLeft />Previous</CommonButton>
                    <CommonButton>Next<FaArrowRight /></CommonButton>
                </div>
            </div>
        </section>
    );
};

export default Header;
