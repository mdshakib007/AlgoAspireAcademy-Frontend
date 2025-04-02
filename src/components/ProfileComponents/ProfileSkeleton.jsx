import React from 'react';

const ProfileSkeleton = () => {
    return (
        <div className='container mx-auto'>
            <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="skeleton h-40 md:h-52 w-40 md:w-52 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <div className="skeleton h-10 w-40"></div>
                    <div className="skeleton h-10 w-58"></div>
                </div>
                <div className="skeleton h-42 w-full"></div>
                <div className="skeleton h-96 w-full"></div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;