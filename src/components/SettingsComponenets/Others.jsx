import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { FaPen } from "react-icons/fa6";
import { FaTrash, FaLock } from "react-icons/fa";
import CommonButton from '../Common/CommonButton';
import toast from 'react-hot-toast';
import { BiWorld } from "react-icons/bi";



const Others = () => {
    const { user, fetchMe, updateUser, changePassword, deleteAccount } = useContext(AuthContext);
    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
    const [editingField, setEditingField] = useState(null);
    const [skills, setSkills] = useState([]); // local state for skills input
    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {
        if (!user) {
            fetchMe();
        }
        // Initialize skills if available
        if (user?.skills) {
            setSkills(user.skills);
        }
    }, [user, fetchMe]);

    const closeModal = () => {
        document.getElementById('change_others_modal').close();
        setEditingField(null);
        reset();
    };

    const onSubmit = async (data) => {
        if (!editingField) return;

        // Special handling based on field
        if (editingField === "password") {
            const { oldPassword, newPassword, confirmNewPassword } = data;
            if (newPassword !== confirmNewPassword) {
                toast.error("New password and confirm password do not match");
                return;
            }
            // Pass only password data
            try {
                await changePassword(oldPassword, newPassword, confirmNewPassword);
                fetchMe();
                closeModal();
                toast.success("Password updated successfully");
            } catch (error) {
                toast.error("Failed to update password");
            }
        }
        else if (editingField === "job_experiences") {
            // Experience expects an object with company, title and duration
            try {
                await updateUser({
                    job_experiences: {
                        company: data.company,
                        title: data.title,
                        start_date: data.start_date,
                        end_date: data.end_date
                    }
                });
                fetchMe();
                closeModal();
                toast.success("Experience updated successfully");
            } catch (error) {
                toast.error("Failed to update experience");
            }
        }
        else if (editingField === "skills") {
            // Use local skills state in place of form data
            try {
                await updateUser({ skills });
                fetchMe();
                closeModal();
                toast.success("Skills updated successfully");
            } catch (error) {
                toast.error("Failed to update skills");
            }
        }
        else if (editingField === "private") {
            // For private, data.private will be a boolean
            try {
                await updateUser({ is_private: !user?.is_private });
                fetchMe();
                closeModal();
                toast.success("Profile privacy updated");
            } catch (error) {
                toast.error("Failed to update privacy settings");
            }
        }
        else if (editingField === "delete") {
            // Confirmation for deletion
            try {
                await deleteAccount();
                window.location.href = '/';
                toast.success("Account deletion successful");
            } catch (error) {
                toast.error("Failed to delete account");
            }
        }
    };

    const openModal = (field, value) => {
        setEditingField(field);
        // Initialize form values based on field
        if (field === "job_experiences" && value) {
            setValue("company", value.company || "");
            setValue("title", value.title || "");
            setValue("duration", value.duration || "");
        } else if (field === "private" && typeof value === "boolean") {
            setValue("private", value);
        }
        document.getElementById('change_others_modal').showModal();
    };

    // Handle Enter key press in skills input
    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (skillInput.trim()) {
                setSkills([...skills, skillInput.trim()]);
                setSkillInput("");
            }
        }
    };

    // Fields definition for the list view
    const fields = [
        { key: "password", label: "Change Password" },
        { key: "job_experiences", label: "Job Experience" },
        { key: "skills", label: "Skills" },
        { key: "private", label: `${user?.is_private ? 'Unlock Your Profile' : 'Lock Your Profile'}` },
        { key: "delete", label: "Delete Your Account" },
    ];

    // Render display value for each field in the list
    const renderDisplayValue = (key) => {
        if (key === "password") {
            return "* * * * * * * *";
        }
        if (key === "job_experiences") {
            if (user?.job_experiences) {
                const { company, title, start_date, end_date } = user.job_experiences;
                return `${company || "N/A"} - ${title || "N/A"} ( ${start_date ? new Date(start_date).toLocaleDateString() : "N/A"} - ${end_date ? new Date(end_date).toLocaleDateString() : "Present"} )`;
            }
            return "N/A";
        }
        if (key === "skills") {
            return user?.skills ? user.skills.join(", ") : "N/A";
        }
        if (key === "private") {
            return user?.is_private ? (
                <>
                    <FaLock /> Locked
                </>
            ) : (
                <>
                    <BiWorld /> Public
                </>
            );
        }
        if (key === "delete") {
            return "Delete Account";
        }
        return user?.[key] || "N/A";
    };

    return (
        <>
            <div className='text-lg'>
                {fields.map(({ key, label }) => (
                    <div key={key} className={`flex justify-between p-2 border-b border-gray-500 items-center ${key === 'delete' ? 'text-red-500' : key === 'private' ? 'text-green-500' : ''}`}>
                        <div>
                            <h1 className='text-gray-300'>{label}</h1>
                            <h1 className='font-bold flex items-center gap-2'>{renderDisplayValue(key)}</h1>
                        </div>
                        <button
                            className='text-gray-300 bg-black h-10 w-10 rounded-box cursor-pointer flex justify-center items-center'
                            onClick={() => openModal(key, user?.[key])}
                        >
                            {key === 'delete' ? <FaTrash className='text-red-500' /> : <FaPen />}
                        </button>
                    </div>
                ))}
            </div>

            <dialog id="change_others_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {/* Close button */}
                    <button onClick={closeModal} className="btn text-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-2xl mb-6">
                        {editingField && fields.find(f => f.key === editingField)?.label}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {editingField === "password" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Old Password</label>
                                    <input type="password" {...register("oldPassword", { required: "Old password is required" })} className="input input-bordered w-full" />
                                    {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">New Password</label>
                                    <input type="password" {...register("newPassword", {
                                        required: "New password is required",
                                        minLength: { value: 8, message: "New password must be at least 8 characters" }
                                    })} className="input input-bordered w-full" />
                                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Confirm New Password</label>
                                    <input type="password" {...register("confirmNewPassword", { required: "Confirm your new password" })} className="input input-bordered w-full" />
                                    {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
                                </div>
                            </div>
                        )}

                        {editingField === "job_experiences" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Company Name</label>
                                    <input type="text" {...register("company", { required: "Company name is required" })} className="input input-bordered w-full" />
                                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Job Title</label>
                                    <input type="text" {...register("title", { required: "Job title is required" })} className="input input-bordered w-full" />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Start Date</label>
                                    <input type="date" {...register("start_date", { required: "Start date is required" })} className="input input-bordered w-full" />
                                    {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">End Date</label>
                                    <input type="date" {...register("end_date")} className="input input-bordered w-full" />
                                </div>
                            </div>
                        )}

                        {editingField === "skills" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Add Skill</label>
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={handleSkillKeyDown}
                                        placeholder="Type a skill and press Enter"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="border border-yellow-500 px-2 rounded-box text-lg">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {editingField === "private" && (
                            <div className="flex items-center">
                                {
                                    user?.is_private ? <label className="mr-4 text-sm font-medium">Unlock Your Profile</label> : <label className="mr-4 text-sm font-medium">Lock Your Profile</label>
                                }
                                <input type="checkbox" {...register("private")} className="toggle toggle-warning toggle-lg" />
                            </div>
                        )}

                        {editingField === "delete" && (
                            <div className="space-y-4">
                                <p className="text-red-600 font-medium">
                                    Are you sure you want to delete your account? This action is irreversible.
                                </p>
                            </div>
                        )}

                        <div className="modal-action">
                            {editingField === "delete" ? (
                                <CommonButton type="submit" className="btn btn-error">Delete Account</CommonButton>
                            ) : (
                                <CommonButton type="submit" className="btn btn-primary">Update</CommonButton>
                            )}
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default Others;
