import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CommonButton from "./CommonButton";
import toast from "react-hot-toast";

const RegistrationForm = () => { 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Reset form after successful registration
    } = useForm();

    const { registerUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError("");

        try {
            const successRes = await registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            });
            setSuccess(successRes.success);
            toast.success(successRes.success);
            reset();
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.detail ||
                err.response?.data?.error ||
                "Registration failed. Please try again.";
            setServerError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Input */}
            <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                    type="text"
                    {...register("username", { required: "Username is required" })}
                    className="input input-bordered w-full"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* Email Input */}
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="input input-bordered w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    className="input input-bordered w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Server Error Message */}
            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            {/* Submit Button */}
            <CommonButton type="submit" className="btn w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </CommonButton>

            {success && <h1 className="text-center font-bold text-2xl text-yellow-500 pt-5">{success}</h1>}
        </form>
    );
};

export default RegistrationForm;
