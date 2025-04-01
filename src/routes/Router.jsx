import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dahsboard";
import { AuthProvider } from "../context/AuthContext";


const AppRouter = () => {
    return (
        <AuthProvider>
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
            <Router>
                <Routes>
                    {/* Wrap all routes with MainLayout */}
                    <Route element={<MainLayout />}>
                        <Route index path="/" element={<Home />} />
                        <Route index path="/profile" element={<Profile />} />
                        <Route index path="/courses" element={<Courses />} />
                        <Route index path="/login" element={<Login />} />
                        <Route index path="/register" element={<Register />} />
                        <Route index path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
