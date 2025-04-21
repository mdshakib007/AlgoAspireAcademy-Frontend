import React, { useState, useContext, useEffect } from 'react';
import {
    MdOutlineStickyNote2,
    MdOutlineSchool
} from 'react-icons/md';
import PostForm from './PostForm';
import PublicNotes from './PublicNotes';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import PostDetails from '../ForumComponents/PostDetails';
import CommonButton from '../Common/CommonButton';
import { FaArrowLeft, FaPenToSquare } from "react-icons/fa6";
import GlowingButton from '../Common/GlowingButton';


const Notes = ({ lesson }) => {
    const { user } = useContext(AuthContext);
    const [myNote, setMyNote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [showOthersNoteId, setShowOthersNoteId] = useState(null);


    const fetchMyNote = async () => {
        setLoading(true);
        try {
            const listRes = await api.get(`/api/discussion/post/list/`, {
                params: {
                    user_id: user.id,
                    lesson_id: lesson.id,
                    post_type: 'note',
                    paginated: false
                },
            });

            const summaries = listRes.data;
            if (summaries.length === 0) {
                setMyNote(null);
                return;
            }
            const noteId = summaries[0].id;

            // 3) Fetch the *detail* endpoint for full fields (body, tags, etc.)
            const detailRes = await api.get(`/api/discussion/post/details/${noteId}/`);
            setMyNote(detailRes.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch your note');
        } finally {
            setLoading(false);
        }
    };

    const reloadMyNote = async () => {
        await fetchMyNote();
        setEditNote(false); // close the form
    };

    const showNote = (noteId) => {
        setShowOthersNoteId(noteId);
    }

    useEffect(() => {
        if (user?.id && lesson?.id) {
            fetchMyNote();
        }
    }, [user?.id, lesson?.id]);

    return (
        <div className="mt-10">
            <h1 className="border-yellow-500 border-l-4 px-2 md:text-lg text-yellow-500 font-bold">Notes</h1>

            {/* Tabs */}
            <div className="tabs tabs-boxed tabs-lg my-4 max-h-[70vh] md:max-h-full overflow-auto">
                {/* My Note Tab */}
                <label className="tab flex items-center gap-2 text-xs md:text-lg">
                    <input type="radio" name="note_tab" defaultChecked />
                    <MdOutlineStickyNote2 />
                    My Note
                </label>
                <div className="tab-content bg-gray-900 p-2 md:p-6">
                    {loading ? (
                        <p className="text-gray-300">Loading your note...</p>
                    ) : editNote ? (
                        <PostForm
                            initialData={myNote}
                            onSuccess={reloadMyNote}
                            currentLesson={lesson}
                        />
                    ) : myNote ? (
                        <>
                            <div className='flex justify-end' onClick={() => setEditNote(!editNote)}>
                                <CommonButton>
                                    <FaPenToSquare /> Edit Note
                                </CommonButton>
                            </div>
                            <PostDetails postId={myNote?.id} />
                        </>
                    ) : (
                        <PostForm currentLesson={lesson} />
                    )}
                </div>

                {/* All Public Notes Tab */}
                <label className="tab flex items-center gap-2 text-xs md:text-lg">
                    <input type="radio" name="note_tab" />
                    <MdOutlineSchool />
                    All Public Notes
                </label>
                <div className="tab-content bg-gray-900 p-2 md:p-6">
                    {showOthersNoteId ? (
                        <>
                            <div 
                            className='flex items-center gap-2 cursor-pointer w-fit rounded-full px-2 py-1 bg-gray-800'
                            onClick={() => setShowOthersNoteId(null)}
                            >
                                <FaArrowLeft />Back
                            </div>
                            <PostDetails postId={showOthersNoteId} />
                        </>
                    ) : (
                        <PublicNotes showNote={showNote} currentLesson={lesson} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notes;
