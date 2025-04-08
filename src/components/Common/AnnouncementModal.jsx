import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosInstance';

const AnnouncementModal = () => {
    const [announcement, setAnnouncement] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastShown = localStorage.getItem('announcementShownDate');

        if (lastShown !== today) {
            api.get('/api/core/announcement/latest/')
                .then((response) => {
                    if (response.data && response.data.title) {
                        setAnnouncement(response.data);
                        localStorage.setItem('announcementShownDate', today);

                        // Wait for state to update before opening modal
                        setTimeout(() => {
                            modalRef.current?.showModal();
                        }, 100);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching announcement:", error);
                });
        }
    }, []);

    if (!announcement) return null;

    return (
        <dialog ref={modalRef} id="announcement_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-xl p-6 rounded-box shadow-lg space-y-4">
                <h3 className="text-2xl font-bold text-center gradient-text">{announcement.title}</h3>

                <div className='flex justify-center'>
                <img
                    src={announcement.cover}
                    alt={announcement.title}
                    className="rounded-box max-h-72 object-cover"
                />
                </div>

                <p className="whitespace-pre-line text-gray-300">
                    {announcement.message}
                </p>

                <form method="dialog" className="flex justify-end">
                    <button className='btn rounded-full bg-yellow-500 text-black hover:bg-orange-500'>Close</button>
                </form>
            </div>
        </dialog>
    );
};

export default AnnouncementModal;
