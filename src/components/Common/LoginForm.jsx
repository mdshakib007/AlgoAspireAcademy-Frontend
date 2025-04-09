import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CommonButton from "./CommonButton";
import { HashLink } from "react-router-hash-link";


const LoginForm = ({ closeModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError("");

        try {
            await login(data.identifier, data.password);
            // Close modal and reset form on success
            closeModal();
            reset();
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
            <p className="text-sm">
                By logging in, you agree to AlgoAspire's <HashLink
                    className="text-yellow-500 underline cursor-pointer" 
                    to='/terms#' 
                    onClick={closeModal}>
                    terms of service
                </HashLink> & <HashLink 
                className="text-yellow-500 underline cursor-pointer" 
                to='/privacy#' 
                onClick={closeModal}>
                    privacy policy
                </HashLink>.
            </p>
        </form>
    );
};

export default LoginForm;
