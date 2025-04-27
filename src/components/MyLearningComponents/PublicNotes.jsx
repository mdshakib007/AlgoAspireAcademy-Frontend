import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import Note from './Note';
import CommonButton from '../Common/CommonButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const PublicNotes = ({ currentLesson, showNote }) => {
    const [notes, setNotes] = useState([]);
    const [pagination, setPagination] = useState({
        next: null,
        previous: null,
        count: 0,
    });
    const [loading, setLoading] = useState(false);
    const listRef = useRef();

    const fetchNotes = async (url = '/api/discussion/post/list/') => {
        if (!currentLesson) return;
        setLoading(true);
        try {
            const response = await api.get(url, {
                params: {
                    post_type: 'note',
                    access_type: 'public',
                    paginated: true,
                    lesson_id: currentLesson.id,
                },
            });
            setNotes(response.data.results);
            setPagination({
                next: response.data.next,
                previous: response.data.previous,
                count: response.data.count,
            });
            // after notes load, scroll the container into view
            listRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch {
            toast.error('Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (pagination.next) {
            fetchNotes(pagination.next);
            toast.success('Switched to next page');
        }
    };

    const handlePrevious = () => {
        if (pagination.previous) {
            fetchNotes(pagination.previous);
            toast.success('Switched to previous page');
        }
    };

    // Re-fetch whenever the lesson changes
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLesson?.id]);

    return (
        <section ref={listRef} aria-busy={loading}>
            <h2 className="text-xl font-bold mb-4 border-b-5 border-gray-500">
                Notes for lesson{' '}
                <span className="gradient-text">
                    {currentLesson?.title || '…'}
                </span>
            </h2>

            {loading ? (
                <div className="flex justify-center py-10">
                    {/* Simple CSS spinner; replace or style as needed */}
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12" />
                </div>
            ) : notes.length === 0 ? (
                <div className="text-center text-gray-300">
                    No public notes available.
                </div>
            ) : (
                <ul className="space-y-4">
                    {notes.map((note) => (
                        <li key={note.id}>
                            <Note showNote={showNote} note={note} />
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex justify-between items-center gap-4 my-5">
                <CommonButton
                    onClick={handlePrevious}
                    disabled={!pagination.previous || loading}
                >
                    <FaArrowLeft />
                </CommonButton>

                <p className="text-gray-400 text-sm">
                    {notes.length} / {pagination.count} Notes
                </p>

                <CommonButton
                    onClick={handleNext}
                    disabled={!pagination.next || loading}
                >
                    Next <FaArrowRight />
                </CommonButton>
            </div>
        </section>
    );
};

export default PublicNotes;
