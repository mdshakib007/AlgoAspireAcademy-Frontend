import React from 'react';
import { FaPhone, FaEnvelope, FaDiscord, FaYoutube, FaLinkedin } from 'react-icons/fa';

const contactItems = [
    {
        icon: <FaPhone className="text-yellow-500 text-4xl animate-pulse" />,
        title: 'Phone / WhatsApp',
        detail: '+8801608897980',
        link: 'https://wa.me/8801608897980',
    },
    {
        icon: <FaEnvelope className="text-yellow-500 text-4xl animate-pulse" />,
        title: 'Email',
        detail: (
            <>
                <a href="mailto:algoaspire.academy@gmail.com" className="block hover:underline">
                    algoaspire.academy@gmail.com
                </a>
                <a href="mailto:shakibahmed.528874@gmail.com" className="block hover:underline">
                    shakibahmed.528874@gmail.com
                </a>
            </>
        ),
    },
    {
        icon: <FaDiscord className="text-yellow-500 text-4xl animate-pulse" />,
        title: 'Discord Community',
        detail: 'Join our Discord',
        link: 'https://discord.gg/PRM5vGcSH9',
    },
    {
        icon: <FaYoutube className="text-yellow-500 text-4xl animate-pulse" />,
        title: 'YouTube Channel',
        detail: 'AlgoAspire on YouTube',
        link: 'https://youtube.com/@AlgoAspire/',
    },
    {
        icon: <FaLinkedin className="text-yellow-500 text-4xl animate-pulse" />,
        title: 'LinkedIn',
        detail: 'Connect on LinkedIn',
        link: 'https://www.linkedin.com/in/mdshakib00777/',
    },
];

const Contact = () => {
    return (
        <div className="px-4 py-16 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text mb-12 text-center tracking-wide">
                Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
                {contactItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-tr from-gray-800 to-gray-700 rounded-box shadow-xl p-6"
                    >
                        <div className="flex items-start space-x-4">
                            {item.icon}
                            <div>
                                <p className="text-2xl font-semibold mb-1">{item.title}</p>
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl text-yellow-500 hover:underline"
                                    >
                                        {item.detail}
                                    </a>
                                ) : (
                                    <div className="text-xl text-yellow-500">{item.detail}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;