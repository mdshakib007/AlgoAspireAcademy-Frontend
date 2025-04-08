import React, { useRef, useState } from 'react';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';


const AnnouncementCard = ({ announcement }) => {
    const [fullAnnouncement, setFullAnnouncement] = useState(null);
    const modalRef = useRef(null);

    const showAnnouncement = async () => {
        try {
            const res = await api.get(`/api/core/announcement/${announcement.id}`);
            setFullAnnouncement(res.data);
            setTimeout(() => {
                modalRef.current?.showModal();
            }, 100);
        }
        catch (err) {
            toast.error("An error occurred");
        }
    }

    return (
        <>
            <div
                className="border p-3 rounded-box border-gray-500"
            >
                <div className="flex items-center gap-4">
                    <div
                        className="h-20 w-20 p-2 rounded-box"
                    >
                        <img
                            src="/announcement.png"
                            alt="Announcement"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-semibold">{announcement.title}</h3>
                        <p className="text-gray-300">
                            {new Date(announcement.created_at).toLocaleDateString()}
                        </p>

                        <span
                            onClick={showAnnouncement}
                            className="text-yellow-500 hover:underline cursor-pointer mt-1 inline-block transition duration-150"
                        >
                            View Details
                        </span>
                    </div>
                </div>
            </div>

            {/* announcement modal  */}
            <dialog ref={modalRef} id="announcement_modal_2" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-xl p-6 rounded-box shadow-lg space-y-4">
                    <h3 className="text-2xl font-bold text-center gradient-text">{fullAnnouncement?.title}</h3>

                    <div className='flex justify-center'>
                        <img
                            src={fullAnnouncement?.cover}
                            alt={fullAnnouncement?.title}
                            className="rounded-box max-h-72 object-cover"
                        />
                    </div>

                    <p className="whitespace-pre-line text-gray-300">
                        {fullAnnouncement?.message}
                    </p>

                    <form method="dialog" className="flex justify-end">
                        <button className='btn rounded-full bg-yellow-500 text-black hover:bg-orange-500'>Close</button>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default AnnouncementCard;