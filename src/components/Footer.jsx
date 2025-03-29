import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='bg-gray-900'>
            <footer className='text-gray-200 container mx-auto'>
                <div className="footer sm:footer-horizontal p-10">
                    <nav>
                        <h6 className="footer-title">Company & Legal</h6>
                        <Link to='/about'>
                            <p className="link link-hover">About us</p>
                        </Link>
                        <Link to='/contact'>
                            <p className="link link-hover">Contact</p>
                        </Link>
                        <Link to='/terms'>
                            <p className="link link-hover">Terms & Condition</p>
                        </Link>
                        <Link to='/privacy'>
                            <p className="link link-hover">Privacy policy</p>
                        </Link>
                        <Link to='/privacy'>
                            <p className="link link-hover">Cookie policy</p>
                        </Link>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Quick Links</h6>
                        <Link to='/courses'>
                            <p className="link link-hover">All Courses</p>
                        </Link>
                        <Link to='cp-course'>
                            <p className="link link-hover">Competitive Programming</p>
                        </Link>
                        <Link to='/forum'>
                            <p className="link link-hover">Forum</p>
                        </Link>
                        <Link to='/leaderboard'>
                            <p className="link link-hover">Leaderboard</p>
                        </Link>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Social Media</h6>
                        <a href='https://youtube.com/@AlgoAspire/' target='_blank' className="link link-hover">YouTube</a>
                        <a href='https://discord.gg/PRM5vGcSH9' target='_blank' className="link link-hover">Discord Community</a>
                    </nav>
                </div>
                <p className="text-sm text-center pb-5 text-gray-300">
                    &copy; AlgoAspire-Academy {new Date().getFullYear()}.
                </p>
            </footer>
        </div>
    );
};

export default Footer;