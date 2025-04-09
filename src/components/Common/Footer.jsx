import React from 'react';
import { HashLink } from 'react-router-hash-link';


const Footer = () => {
    return (
        <div className='bg-gray-900'>
            <footer className='text-gray-200 container mx-auto'>
                <div className="footer sm:footer-horizontal p-10">
                    <nav>
                        <h6 className="footer-title">Company & Legal</h6>
                        <HashLink to='/about#'>
                            <p className="link link-hover">About us</p>
                        </HashLink>
                        <HashLink to='/contact#'>
                            <p className="link link-hover">Contact</p>
                        </HashLink>
                        <HashLink to='/terms#'>
                            <p className="link link-hover">Terms & Condition</p>
                        </HashLink>
                        <HashLink to='/privacy#'>
                            <p className="link link-hover">Privacy policy</p>
                        </HashLink>
                        <HashLink to='/rules#'>
                            <p className="link link-hover">Rules & Guidelines</p>
                        </HashLink>
                        <HashLink to='/credit#'>
                            <p className="link link-hover">Credits</p>
                        </HashLink>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Quick Links</h6>
                        <HashLink to='/courses#'>
                            <p className="link link-hover">All Courses</p>
                        </HashLink>
                        <HashLink to='cp-course#'>
                            <p className="link link-hover">Competitive Programming</p>
                        </HashLink>
                        <HashLink to='/forum#'>
                            <p className="link link-hover">Forum</p>
                        </HashLink>
                        <HashLink to='/leaderboard#'>
                            <p className="link link-hover">Leaderboard</p>
                        </HashLink>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Social Media</h6>
                        <a href='https://youtube.com/@AlgoAspire/' target='_blank' className="link link-hover">YouTube</a>
                        <a href='https://discord.gg/PRM5vGcSH9' target='_blank' className="link link-hover">Discord Community</a>
                    </nav>
                </div>
                <p className="text-sm text-center pb-5 text-gray-300">
                    &copy; AlgoAspire-Academy {new Date().getFullYear()}. <span className='text-gray-500'>(V1.0.0)</span>
                </p>
            </footer>
        </div>
    );
};

export default Footer;