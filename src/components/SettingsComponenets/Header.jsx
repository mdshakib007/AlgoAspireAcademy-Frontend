import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileSkeleton from "../ProfileComponents/ProfileSkeleton";
import LoadUsername from '../Common/LoadUsername';
import { FaPen, FaLinesLeaning } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import General from './General';
import Others from './Others';
import Social from './Social';
import CommonButton from '../Common/CommonButton'; // Assuming you have this component
import toast from 'react-hot-toast';

const Header = () => {
    const { user, fetchUser, updateUser } = useContext(AuthContext);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const modalRef = useRef();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const selectedFile = watch("profile_picture");

    useEffect(() => {
        if (selectedFile && selectedFile[0]) {
            const objectUrl = URL.createObjectURL(selectedFile[0]);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl); // cleanup
        }
    }, [selectedFile]);

    const onSubmit = async (data) => {
        setUploading(true);
        const profile_pic = data.profile_picture[0];
        let profile_url = null;

        // upload image to imgbb.com then get a url and put url to my backend.
        const imgForm = new FormData();
        imgForm.append('image', profile_pic);
        try {
            const imgResponse = await fetch("https://api.imgbb.com/1/upload?key=a1628c9dacce3ab8a8de3488c32afc47", {
                method: "POST",
                body: imgForm,
            });

            const imgData = await imgResponse.json();

            if (imgData.success) {
                profile_url = imgData.data.display_url;
            } else {
                toast.error("Failed to upload image");
                setUploading(false);
                return;
            }
        } catch (error) {
            console.error("Image upload error:", error);
            setUploading(false);
            toast.error("Failed to upload image");
            return;
        }

        try {
            await updateUser({ profile_picture : profile_url });
            fetchUser();
            setUploading(false);
            document.getElementById('change_profile_pic_modal').close();
            toast.success("Profile picture updated successfully");
        } catch (error) {
            toast.error("Failed to update profile picture");
        }
        setUploading(false);
    };

    if (!user) {
        return <ProfileSkeleton />;
    }

    const openModal = () => {
        if (modalRef.current) modalRef.current.showModal();
    };

    return (
        <section className='container mx-auto px-2'>
            <div className='flex flex-col items-center'>
                <div className="relative">
                    <img
                        src={user.profile_picture || '/default-user.png'}
                        alt={user.username}
                        className='h-40 md:h-52 w-40 md:w-52 rounded-full object-cover p-2 border-3 border-gray-700'
                    />
                    <button
                        className='absolute bottom-2 right-2 text-xl text-white bg-gray-700 p-2 rounded-full cursor-pointer'
                        onClick={openModal}
                        title="Change Profile Picture"
                    >
                        <FaPen />
                    </button>
                </div>
                <LoadUsername currentUser={user} />
                <p className='text-lg md:text-xl text-gray-300'>{user.email}</p>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-box tabs-lg my-10 overflow-auto">
                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" defaultChecked />
                    <IoMdInformationCircleOutline />
                    About
                </label>
                <div className="tab-content bg-gray-700 p-6">
                    <General />
                </div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <FaRegUserCircle />
                    Social
                </label>
                <div className="tab-content bg-gray-700 p-6">
                    <Social />
                </div>

                <label className="tab flex items-center gap-2">
                    <input type="radio" name="profile_tabs" />
                    <FaLinesLeaning />
                    Others
                </label>
                <div className="tab-content bg-gray-700 p-6">
                    <Others />
                </div>
            </div>

            {/* Modal */}
            <dialog id="change_profile_pic_modal" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn text-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl mb-6">Change Your Profile Picture</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Select an image</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("profile_picture", { required: "Profile picture is required." })}
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.profile_picture && (
                                <p className="text-red-400 text-sm mt-1">{errors.profile_picture.message}</p>
                            )}
                        </div>

                        {preview && (
                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-300 mb-1">Preview:</p>
                                <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded-full border" />
                            </div>
                        )}

                        <div className="modal-action">
                            <CommonButton type="submit" className="btn btn-primary">
                                {uploading ? "Uploading..." : "Update"}
                            </CommonButton>
                        </div>
                    </form>
                </div>
            </dialog>
        </section>
    );
};

export default Header;
