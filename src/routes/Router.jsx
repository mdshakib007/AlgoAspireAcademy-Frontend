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
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import CourseDetails from "../components/CourseComponents/CourseDetails";


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
                        <Route index path="/profile/:username" element={<Profile />} />
                        <Route index path="/settings" element={<Settings />} />
                        <Route index path="/courses" element={<Courses />} />
                        <Route index path="/course/:idAndSlug" element={<CourseDetails />} />
                        <Route index path="/login" element={<Login />} />
                        <Route index path="/register" element={<Register />} />
                        <Route index path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
