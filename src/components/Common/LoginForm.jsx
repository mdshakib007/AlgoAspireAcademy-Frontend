import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CommonButton from "./CommonButton";


const LoginForm = ({ closeModal }) => { // Accept closeModal prop
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Reset form after login
    } = useForm();

    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError("");

        try {
            await login(data.identifier, data.password);
            // Close modal and reset form on success
            closeModal();
            reset();

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (err) {
            setServerError("Invalid credentials or server error.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Identifier Input */}
            <div>
                <label className="block text-sm font-medium">Username or Email</label>
                <input
                    type="text"
                    {...register("identifier", { required: "This field is required" })}
                    className="input input-bordered w-full"
                />
                {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier.message}</p>}
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 1, message: "This field is required" },
                    })}
                    className="input input-bordered w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Server Error Message */}
            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            {/* Submit Button */}
            <CommonButton type="submit" className="btn w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </CommonButton>
        </form>
    );
};

export default LoginForm;
