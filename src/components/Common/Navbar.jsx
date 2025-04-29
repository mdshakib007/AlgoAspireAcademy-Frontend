import { useContext, useEffect } from "react";
import { HashLink } from 'react-router-hash-link';
import GlowingButton from './GlowingButton';
import SimpleButton from './SimpleButton';
import { AuthContext } from "../../context/AuthContext";
import {
    FaBell, FaYoutube, FaDiscord, FaBolt, FaBookmark,
    FaHourglassStart, FaUser, FaSignOutAlt, FaQuestionCircle,
    FaExternalLinkAlt, FaChevronDown, FaInfoCircle, FaLock, FaCrown
} from "react-icons/fa";
import {
    MdOutlineLeaderboard, MdOutlineForum,
    MdOutlineDashboardCustomize, MdOutlineQuiz
} from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { RiDashboardHorizontalFill, RiPagesFill } from "react-icons/ri";
import Headroom from 'react-headroom';
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";


const Navbar = ({ modalRef }) => {
    const { user, logout } = useContext(AuthContext);

    const darkMode = useThemeStore((state) => state.darkMode);
    const toggle = useThemeStore((state) => state.toggle);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', darkMode);
        root.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <Headroom>
            <nav className="top-0 left-0 w-full text-white z-50">
                <div className="navbar container mx-auto bg-transparent mt-2 rounded-lg backdrop-blur border border-gray-700">
                    {/* Left Section: Logo */}
                    <div className="flex-1">
                        <div className="flex">
                            <HashLink to="/#">
                                <motion.img
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    src="/aaa_favicon.png"
                                    alt="AAA"
                                    className="h-14 w-14"
                                />
                            </HashLink>
                        </div>
                    </div>

                    {/* Center Section: Nav Links (Hidden on small screens) */}
                    <div className={`hidden lg:flex gap-2`}>
                        <HashLink to="/courses#">
                            <SimpleButton>
                                All Courses
                            </SimpleButton>
                        </HashLink>
                        <HashLink to="/cp-course#">
                            <SimpleButton>
                                CP Arena
                            </SimpleButton>
                        </HashLink>
                        <HashLink to="/forum#">
                            <SimpleButton>
                                Forum
                            </SimpleButton>
                        </HashLink>
                        <HashLink to="/leaderboard#">
                            <SimpleButton>
                                Leaderborad
                            </SimpleButton>
                        </HashLink>


                        <label className="swap swap-rotate">
                            <input type="checkbox" checked={darkMode} onChange={toggle} />
                            <svg
                                class="swap-off h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            <svg
                                class="swap-on h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>

                    {/* mobile menu dropdown */}
                    <div className="dropdown dropdown-start cursor-pointer">
                        <div tabIndex={0} role="button" className="ms-5 flex lg:hidden justify-center items-center hover:text-yellow-500 cursor-pointer">
                            <div>
                                <SimpleButton>
                                    Menu <FaChevronDown />
                                </SimpleButton>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-46 md:w-52 text-md md:text-lg">
                            <li>
                                <HashLink to="/courses#">
                                    <MdOutlineDashboardCustomize /> All Courses
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="/cp-course#">
                                    <MdOutlineQuiz /> CP Arena
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="/forum#">
                                    <MdOutlineForum /> Forum
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="/leaderborad#">
                                    <MdOutlineLeaderboard /> Leaderborad
                                </HashLink>
                            </li>
                            {
                                user &&
                                <div className="flex md:hidden items-center justify-center text-xl font-bold border m-2 rounded-full overflow-hidden">
                                    <img src="/neon-gem.png" alt="Neon" className="h-8 w-8" />
                                    32
                                </div>
                            }
                        </ul>

                    </div>

                    <div className="flex gap-2">
                        {
                            !user &&
                            <>
                                <div className="dropdown dropdown-end cursor-pointer">
                                    <div tabIndex={0} role="button">
                                        <div>
                                            <SimpleButton>
                                                More <FaChevronDown />
                                            </SimpleButton>
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-62 md:w-72 text-md md:text-lg">
                                        <li>
                                            <HashLink to="/about#">
                                                <FaInfoCircle /> About AlgoAspire
                                            </HashLink>
                                        </li>
                                        <li>
                                            <HashLink to="/#faqs">
                                                <FaQuestionCircle />
                                                FAQ
                                            </HashLink>
                                        </li>
                                        <li>
                                            <HashLink to="/privacy#">
                                                <FaLock /> Privacy Policy
                                            </HashLink>
                                        </li>
                                        <li>
                                            <HashLink to="/terms#">
                                                <RiPagesFill /> Terms & Condition
                                            </HashLink>
                                        </li>
                                        <li>
                                            <HashLink to="/credit#">
                                                <FaCrown /> Credit
                                            </HashLink>
                                        </li>
                                        <div className="border-b border-gray-500 my-2"></div>
                                        <li>
                                            <a href="https://youtube.com/@AlgoAspire/" target="_blank">
                                                <FaYoutube /> YouTube <FaExternalLinkAlt />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://discord.gg/PRM5vGcSH9" target="_blank">
                                                <FaDiscord /> Discord Community <FaExternalLinkAlt />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <p onClick={() => modalRef.current?.openModal()}>
                                    <GlowingButton>
                                        Sign In
                                    </GlowingButton>
                                </p>
                            </>
                        }
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notification Button */}
                        {
                            user && <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="ms-5 btn-circle flex justify-center items-center hover:text-yellow-500 cursor-pointer">
                                    <div className="indicator">
                                        <FaBell className="text-2xl" />
                                    </div>
                                </div>
                                <div tabIndex={0} className="dropdown-content bg-gray-900 mt-3 w-60 rounded-box">
                                    <div className="p-3 text-md md:text-lg">
                                        <span className="font-bold text-white">3 Notifications</span>
                                        <ul className="mt-2 text-white">
                                            <li className="p-2 hover:bg-gray-800 rounded">
                                                New course added!
                                            </li>
                                            <li className="p-2 hover:bg-gray-800 rounded">
                                                You got a new follower
                                            </li>
                                            <li className="p-2 hover:bg-gray-800 rounded">
                                                Your post was liked
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* neon gems */}
                        {
                            user &&
                            <div className="hidden md:flex items-center text-xl font-bold border pr-2 rounded-full">
                                <img src="/neon-gem.png" alt="Neon" className="h-10 w-10" />
                                23
                            </div>
                        }

                        {/* user profile dropdown  */}
                        {
                            user &&
                            <div className="dropdown dropdown-end cursor-pointer">
                                <div tabIndex={0} role="button">
                                    <div>
                                        <img
                                            src={user?.profile_picture || "/default-user.png"}
                                            alt="Profile"
                                            className="w-12 h-12 object-cover rounded-full border border-gray-700" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-62 md:w-72 text-md md:text-lg">
                                    <li>
                                        <HashLink to={`/profile/${user?.username}#`}>
                                            <FaUser /> Profile
                                        </HashLink>
                                    </li>
                                    <li>
                                        <HashLink to="/my-learning#">
                                            <FaHourglassStart /> Continue Learning
                                        </HashLink>
                                    </li>
                                    <li>
                                        <HashLink to="/dashboard#">
                                            <RiDashboardHorizontalFill /> Dashboard
                                        </HashLink>
                                    </li>
                                    <li>
                                        <HashLink to="/bookmarks#">
                                            <FaBookmark /> Bookmarks
                                        </HashLink>
                                    </li>
                                    <li>
                                        <HashLink to="/activity#">
                                            <FaBolt /> My Activity
                                        </HashLink>
                                    </li>
                                    <li>
                                        <HashLink to="/settings#">
                                            <FaGear /> Settings
                                        </HashLink>
                                    </li>
                                    <div className="border-b border-gray-500 my-2"></div>
                                    <li>
                                        <HashLink to="/#faqs">
                                            <FaQuestionCircle /> FAQ
                                        </HashLink>
                                    </li>
                                    <li onClick={logout}>
                                        <a>
                                            <FaSignOutAlt /> Logout
                                        </a>
                                    </li>
                                    <div className="border-b border-gray-500 my-2"></div>
                                    <li>
                                        <a href="https://youtube.com/@AlgoAspire/" target="_blank">
                                            <FaYoutube /> YouTube
                                            <FaExternalLinkAlt />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://discord.gg/PRM5vGcSH9" target="_blank">
                                            <FaDiscord /> Discord Community <FaExternalLinkAlt />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </nav >
        </Headroom>
    );
};


export default Navbar;