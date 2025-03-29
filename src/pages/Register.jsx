// src/pages/Register.jsx
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Define a validation schema with yup (without confirmPassword)
const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser } = useContext(AuthContext);

    // Initialize react-hook-form with yup validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await registerUser(data); // data now contains { username, email, password }
            navigate("/login");
        } catch (err) {
            console.error("Registration failed", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="flex flex-col md:flex-row bg-base-200 rounded-lg shadow-xl overflow-hidden max-w-4xl">
                {/* Left side image */}
                <div className="md:w-1/2">
                    <img
                        src="/assets/register-image.jpg"  // Replace with your actual image path
                        alt="Register Illustration"
                        className="object-cover w-full h-full"
                    />
                </div>
                {/* Right side form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                {...register("username")}
                                className="input input-bordered w-full"
                                placeholder="Enter your username"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="input input-bordered w-full"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
