import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import GlowingButton from './GlowingButton';
import SimpleButton from './SimpleButton';
import { AuthContext } from "../../context/AuthContext";
import {
    FaBell, FaYoutube, FaDiscord, FaBolt, FaBookmark,
    FaHourglassStart, FaUser, FaSignOutAlt, FaQuestionCircle,
    FaExternalLinkAlt, FaChevronDown, FaInfoCircle, FaLock, FaCrown
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import { BiMenuAltRight } from "react-icons/bi";
import { RiDashboardHorizontalFill, RiPagesFill } from "react-icons/ri";


const Navbar = ({ modalRef }) => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="fixed top-0 left-0 w-full text-white z-50">
            <div className="navbar container mx-auto bg-transparent mt-2 rounded-lg backdrop-blur-xl border border-gray-700">
                {/* Left Section: Logo */}
                <div className="flex-1">
                    <div className="flex">
                        <HashLink className="tooltip tooltip-warning tooltip-bottom" to="/#" data-tip='Return to Home'>
                            <img src="/aaa_favicon.png" alt="AAA" className="h-14 w-14" />
                        </HashLink>
                    </div>
                </div>

                {/* Center Section: Nav Links (Hidden on small screens) */}
                <div className={`hidden lg:flex gap-2`}>
                    <SimpleButton>
                        <Link to="/courses">All Courses</Link>
                    </SimpleButton>
                    <SimpleButton>
                        <Link to="/cp-course">CP Arena</Link>
                    </SimpleButton>
                    <SimpleButton>
                        <Link to="/forum">Forum</Link>
                    </SimpleButton>
                    <SimpleButton>
                        <Link to="/leaderboard">Leaderborad</Link>
                    </SimpleButton>
                    {
                        !user &&
                        <>
                            <div className="dropdown dropdown-end cursor-pointer">
                                <div tabIndex={0} role="button">
                                    <div>
                                        <SimpleButton>More <FaChevronDown /></SimpleButton>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-62 md:w-72 text-md md:text-lg">
                                    <li><Link to="/about"><FaInfoCircle /> About AlgoAspire</Link></li>
                                    <li><Link to="/faq"><FaQuestionCircle /> FAQ</Link></li>
                                    <li><Link to="/privacy"><FaLock /> Privacy Policy</Link></li>
                                    <li><Link to="/terms"><RiPagesFill /> Terms & Condition</Link></li>
                                    <li><Link to="/credit"><FaCrown /> Credit</Link></li>
                                    <div className="border-b border-gray-500 my-2"></div>
                                    <li><a href="https://youtube.com/@AlgoAspire/" target="_blank"><FaYoutube /> YouTube <FaExternalLinkAlt /></a></li>
                                    <li><a href="https://discord.gg/PRM5vGcSH9" target="_blank"><FaDiscord /> Discord Community <FaExternalLinkAlt /></a></li>
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
                                        <li className="p-2 hover:bg-gray-700 rounded">New course added!</li>
                                        <li className="p-2 hover:bg-gray-700 rounded">You got a new follower</li>
                                        <li className="p-2 hover:bg-gray-700 rounded">Your post was liked</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        user &&
                        <div className="dropdown dropdown-end cursor-pointer">
                            <div tabIndex={0} role="button" className="px-2 py-1">
                                <div>
                                    <img src={user?.profile_picture || "/default-user.png"} alt="Profile" className="w-12 h-12 object-cover rounded-full border border-gray-700" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-gray-900 rounded-box mt-3 w-62 md:w-72 text-md md:text-lg">
                                <li><Link to="/profile"><FaUser /> Profile</Link></li>
                                <li><Link to="/my-courses"><FaHourglassStart /> Continue Learning</Link></li>
                                <li><Link to="/dashboard"><RiDashboardHorizontalFill /> Dashboard</Link></li>
                                <li><Link to="/activity"><FaBookmark /> Bookmarks</Link></li>
                                <li><Link to="/activity"><FaBolt /> My Activity</Link></li>
                                <li><Link to="/settings"><FaGear /> Settings</Link></li>
                                <div className="border-b border-gray-500 my-2"></div>
                                <li><Link to="/faq"><FaQuestionCircle /> FAQ</Link></li>
                                <li onClick={logout}><a><FaSignOutAlt /> Logout</a></li>
                                <div className="border-b border-gray-500 my-2"></div>
                                <li><a href="https://youtube.com/@AlgoAspire/" target="_blank"><FaYoutube /> YouTube <FaExternalLinkAlt /></a></li>
                                <li><a href="https://discord.gg/PRM5vGcSH9" target="_blank"><FaDiscord /> Discord Community <FaExternalLinkAlt /></a></li>
                            </ul>
                        </div>
                    }


                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden">
                        <button className="px-2 py-1 text-2xl" onClick={toggleMenu}>
                            {menuOpen ? <HiMiniXMark /> : <BiMenuAltRight />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                menuOpen && (
                    <div className="lg:hidden bg-transparent backdrop-blur-xl text-white p-4 flex flex-col gap-2">
                        <SimpleButton>
                            <Link to="/courses">All Courses</Link>
                        </SimpleButton>
                        <SimpleButton>
                            <Link to="/cp-course">CP Arena</Link>
                        </SimpleButton>
                        <SimpleButton>
                            <Link to="/forum">Forum</Link>
                        </SimpleButton>
                        <SimpleButton>
                            <Link to="/leaderboard">Leaderborad</Link>
                        </SimpleButton>
                        {
                            !user &&
                            <>
                                <SimpleButton>
                                    <Link to="/more">More</Link>
                                </SimpleButton>
                                <p onClick={() => modalRef.current?.openModal()}>
                                    <GlowingButton className="w-full">
                                        Sign In
                                    </GlowingButton>
                                </p>
                            </>
                        }
                    </div>
                )
            }
        </nav >
    );
};


export default Navbar;