import { useContext } from "react";
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


const Navbar = ({ modalRef }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Headroom>
            <nav className="top-0 left-0 w-full text-white z-50">
                <div className="navbar container mx-auto bg-zinc-500/10 mt-2 rounded-lg backdrop-blur-xl border-2 border-gray-700">
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