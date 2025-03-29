// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.identifier, formData.password);
            navigate("/dashboard"); // or redirect to home page after login
        } catch (err) {
            setError("Invalid credentials or server error.", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className=" p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <label className="block mb-2">
                    Email or Username:
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        className="w-full border rounded p-2 mt-1"
                        required
                    />
                </label>
                <label className="block mb-4">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded p-2 mt-1"
                        required
                    />
                </label>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
