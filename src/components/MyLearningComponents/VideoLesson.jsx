import React from 'react';

const extractYouTubeID = (url) => {
    if (!url || typeof url !== 'string') return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

const VideoLesson = ({ lesson }) => {
    if (!lesson) return null;

    const videoId = extractYouTubeID(lesson.video);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    return (
        <div className="p-2 md:p-6 rounded-xl text-white space-y-4">
            <div className='flex justify-between gap-3 border-b-5 border-gray-700 gradient-text'>
                <h2 className="md:text-xl font-bold">{lesson.title}</h2>
                <p className='text-xs md:text-sm'>Updated: {new Date(lesson.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
            </div>
            <div className='border-yellow-500 border-l-5 px-2'>
                <h1 className=' md:text-lg text-yellow-500 font-bold'>Lesson Summary</h1>
                <p className='text-sm text-gray-300'>{lesson?.summary || 'No Summary Available'}</p>
            </div>

            {embedUrl ? (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-700">
                    <iframe
                        className="w-full h-full"
                        src={embedUrl}
                        title={lesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <p className="text-red-400">Video not available or invalid link.</p>
            )}
        </div>
    );
};

export default VideoLesson;
