import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { FaPen } from "react-icons/fa6";
import CommonButton from '../Common/CommonButton';
import toast from 'react-hot-toast';


const General = () => {
    const { user, fetchMe, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, setValue } = useForm();
    const [editingField, setEditingField] = useState(null);
    
    useEffect(() => {
        if (!user) {
            fetchMe();
        }
    }, [user, fetchMe]);

    const onSubmit = async (data) => {
        if (!editingField) return;
        try {
            await updateUser({ [editingField]: data[editingField] });
            fetchMe();
            document.getElementById('change_info_modal').close();
            toast.success("Information updated successfully");
        } catch (error) {
            toast.error("Failed to update user info");
        }
    };

    const openModal = (field, value) => {
        setEditingField(field);
        setValue(field, value || "");
        document.getElementById('change_info_modal').showModal();
    };

    const fields = [
        { key: "full_name", label: "Full Name" },
        { key: "date_of_birth", label: "Date of Birth", type: "date" },
        { key: "phone_number", label: "Phone" },
        { key: "t_shirt_size", label: "T-Shirt Size", type: "select", options: ["S", "M", "L", "XL", "XXL"] },
        { key: "country", label: "Country" },
        { key: "city", label: "City" },
        { key: "organization", label: "Organization" }
    ];

    return (
        <>
            <div className='text-lg'>
                {fields.map(({ key, label }) => (
                    <div key={key} className='flex justify-between p-2 border-b border-gray-500'>
                        <div>
                            <h1 className='text-gray-300'>{label}</h1>
                            <h1 className='font-bold'>{user?.[key] || 'N/A'}</h1>
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

            <dialog id="change_info_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn text-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl mb-6">Edit {editingField ? fields.find(f => f.key === editingField)?.label : 'Info'}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium">{editingField ? fields.find(f => f.key === editingField)?.label : 'Field'}</label>
                            {editingField && (
                                editingField === "t_shirt_size" ? (
                                    <select {...register(editingField)} className="input input-bordered w-full">
                                        {fields.find(f => f.key === editingField)?.options.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : editingField === "date_of_birth" ? (
                                    <input type="date" {...register(editingField)} className="input input-bordered w-full" />
                                ) : (
                                    <input type="text" {...register(editingField)} className="input input-bordered w-full" />
                                )
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

export default General;
