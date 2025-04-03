import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { FaPen } from "react-icons/fa6";
import CommonButton from '../Common/CommonButton';
import toast from 'react-hot-toast';

const Social = () => {
    const { user, fetchUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    // Helper function to define validation rules based on the field being edited.
    const getValidationRules = (field) => {
        if (field === "bio") {
            return {
                required: "Bio is required",
                minLength: { value: 10, message: "Bio must be at least 10 characters" },
                maxLength: { value: 250, message: "Bio must be at most 250 characters" }
            };
        } else {
            // URL validation regex pattern: This simple pattern validates http or https URLs.
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return {
                required: `${field} is required`,
                pattern: { value: urlPattern, message: "Invalid URL" }
            };
        }
    };

    const onSubmit = async (data) => {
        if (!editingField) return;
        try {
            await updateUser({ [editingField]: data[editingField] });
            fetchUser();
            document.getElementById('change_social_modal').close();
            toast.success("Information updated successfully");
        } catch (error) {
            toast.error("Failed to update user info");
        }
    };

    const openModal = (field, value) => {
        setEditingField(field);
        setValue(field, value || "");
        document.getElementById('change_social_modal').showModal();
    };

    const fields = [
        { key: "bio", label: "Bio" },
        { key: "portfolio", label: "Your Portfolio" },
        { key: "github", label: "Your GitHub" },
        { key: "instagram", label: "Your Instagram" },
        { key: "linkedin", label: "Your LinkedIn" },
        { key: "codeforces", label: "Your Codeforces" },
    ];

    return (
        <>
            <div className='text-lg'>
                {fields.map(({ key, label }) => (
                    <div key={key} className={`flex justify-between p-2 border-b border-gray-500 ${key !== 'bio' && 'text-yellow-500'}`}>
                        <div>
                            <h1 className='text-gray-300'>{label}</h1>
                            <h1 className='font-bold'>
                                {key === 'bio' ? (
                                    user?.[key] || 'N/A'
                                ) : (
                                    user?.[key] ? (
                                        <a href={`${user?.[key]}`} target="_blank" rel="noopener noreferrer">
                                            {user?.[key]}
                                        </a>
                                    ) : 'N/A'
                                )}
                            </h1>

                        </div>
                        <button
                            className='text-gray-300 bg-black h-10 w-10 rounded-box cursor-pointer flex justify-center items-center'
                            onClick={() => openModal(key, user?.[key])}
                        >
                            <FaPen />
                        </button>
                    </div>
                ))}
            </div>

            <dialog id="change_social_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn text-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl mb-6">
                        Edit {editingField ? fields.find(f => f.key === editingField)?.label : 'Info'}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium">
                                {editingField ? fields.find(f => f.key === editingField)?.label : 'Field'}
                            </label>
                            {editingField && (
                                editingField === "bio" ? (
                                    <textarea
                                        {...register(editingField, getValidationRules(editingField))}
                                        className="textarea textarea-bordered w-full h-32"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        {...register(editingField, getValidationRules(editingField))}
                                        className="input input-bordered w-full text-yellow-500"
                                    />
                                )
                            )}
                            {/* Display error message if exists */}
                            {errors[editingField] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[editingField]?.message}
                                </p>
                            )}
                        </div>
                        <div className="modal-action">
                            <CommonButton type="submit" className="btn btn-primary">Update</CommonButton>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default Social;
