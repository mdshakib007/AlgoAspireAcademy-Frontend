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
import MyCourses from "../pages/MyCourses";
import MyLearning from "../pages/MyLearning";
import PrivacyPolicy from "../pages/PrivacyPolicy";


const AppRouter = () => {
    return (
        <AuthProvider>
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            backgroundColor: "#1a202c",
                            color: "#fff",
                            borderRadius: "1000rem",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                        },
                        success: {
                            backgroundColor: "#38a169",
                            color: "#ffffff",
                        },
                        error: {
                            backgroundColor: "#e53e3e",
                            color: "#ffffff",
                        },
                        loading: {
                            backgroundColor: "#edf2f7",
                            color: "#4a5568",
                        },
                    }}
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
                        <Route index path="/my-learning" element={<MyCourses />} />
                        <Route index path="/my-learning/course/:idAndSlug" element={<MyLearning />} />
                        <Route index path="/course/:idAndSlug" element={<CourseDetails />} />
                        <Route index path="/login" element={<Login />} />
                        <Route index path="/register" element={<Register />} />
                        <Route index path="/dashboard" element={<Dashboard />} />
                        <Route index path="/privacy" element={<PrivacyPolicy />} />
                        <Route index path="/terms" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
