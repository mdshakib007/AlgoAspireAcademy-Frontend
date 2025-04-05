import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBirthdayCake, FaBuilding, FaGithub, FaInstagram, FaLinkedin, FaCode, FaBriefcase, FaLink } from 'react-icons/fa';

const About = ({ user }) => {
    if (!user) return null;

    const {
        full_name,
        username,
        email,
        profile_picture,
        date_of_birth,
        phone_number,
        t_shirt_size,
        country,
        city,
        organization,
        bio,
        portfolio,
        github,
        instagram,
        linkedin,
        codeforces,
        job_experiences
    } = user;

    return (
        <div className="max-w-5xl mx-auto p-4 mt-8 text-white">
            {/* Profile Header */}
            <div className="bg-gray-800 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={profile_picture || '/default-user.png'} alt={username} className="w-40 h-40 object-cover rounded-full border-4 border-yellow-500" />
                <div>
                    <h1 className="text-3xl font-bold">{full_name || "N/A"}</h1>
                    <p className="text-lg text-gray-400">@{username}</p>
                    <p className="mt-2">{bio || "N/A"}</p>
                    {
                        portfolio && (
                            <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 flex items-center gap-2 mt-2 hover:underline">
                                <FaLink /> Portfolio
                            </a>
                        )
                    }
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-gray-900 rounded-xl mt-6 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-700">
                <h2 className="col-span-1 md:col-span-2 text-xl font-semibold border-b border-gray-600 pb-2">Personal Information</h2>
                <div><strong>Email:</strong> <p className="flex items-center gap-2 text-gray-300"><FaEnvelope /> {email}</p></div>
                <div><strong>Phone:</strong> <p className="flex items-center gap-2 text-gray-300"><FaPhoneAlt /> {phone_number || "N/A"}</p></div>
                <div><strong>Date of Birth:</strong> <p className="flex items-center gap-2 text-gray-300"><FaBirthdayCake /> {date_of_birth || "N/A"}</p></div>
                <div><strong>T-Shirt Size:</strong> <p className="text-gray-300">{t_shirt_size || "N/A"}</p></div>
                <div><strong>Country:</strong> <p className="flex items-center gap-2 text-gray-300"><FaMapMarkerAlt /> {country || "N/A"}</p></div>
                <div><strong>City:</strong> <p className="text-gray-300">{city || "N/A"}</p></div>
                <div className="md:col-span-2"><strong>Organization:</strong> <p className="flex items-center gap-2 text-gray-300"><FaBuilding /> {organization || "N/A"}</p></div>
            </div>

            {/* Socials */}
            <div className="bg-gray-900 rounded-xl mt-6 p-6 border border-gray-700">
                <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Social Profiles</h2>
                <div className="flex flex-wrap gap-4 text-lg">
                    {github && <a href={github} className="hover:text-yellow-500 flex items-center gap-2" target="_blank"><FaGithub /> GitHub</a>}
                    {instagram && <a href={instagram} className="hover:text-yellow-500 flex items-center gap-2" target="_blank"><FaInstagram /> Instagram</a>}
                    {linkedin && <a href={linkedin} className="hover:text-yellow-500 flex items-center gap-2" target="_blank"><FaLinkedin /> LinkedIn</a>}
                    {codeforces && <a href={codeforces} className="hover:text-yellow-500 flex items-center gap-2" target="_blank"><FaCode /> Codeforces</a>}
                </div>
            </div>

            {/* Job Experience */}
            <div className="bg-gray-900 rounded-xl mt-6 p-6 border border-gray-700">
                <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Job Experience</h2>
                {job_experiences && (
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg"><FaBriefcase className="inline mr-2" /> {job_experiences.title}</p>
                            <p className="text-gray-300">{job_experiences.company}</p>
                        </div>
                        <div className="text-right text-gray-400">
                            <p>{job_experiences.start_date} → {job_experiences.end_date}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
