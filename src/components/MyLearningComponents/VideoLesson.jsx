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
        <div className="p-4 md:p-6 rounded-xl text-white space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-yellow-500">{lesson.title}</h2>
                {lesson.summary && (
                    <p className="mt-2 text-sm text-gray-300">{lesson.summary}</p>
                )}
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

            <div className="text-right text-sm text-gray-300">
                Updated: {new Date(lesson.updated_at).toLocaleDateString()}
            </div>
        </div>
    );
};

export default VideoLesson;
