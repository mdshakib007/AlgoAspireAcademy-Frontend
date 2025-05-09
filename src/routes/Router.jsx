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
import Terms from "../pages/Terms";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Credit from "../pages/Credit";
import Rules from "../pages/Rules";
import Forum from "../pages/Forum";
import PostDetails from "../components/ForumComponents/PostDetails";
import CreatePost from "../components/ForumComponents/CreatePost";
import EditPost from "../components/ForumComponents/EditPost";
import MyBookmarks from "../pages/MyBookmarks";
import MyActivity from "../pages/MyActivity";
import Leaderboard from "../pages/Leaderboard";


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
                        <Route index path="/forum" element={<Forum />} />
                        <Route index path="/forum/post/:postId" element={<PostDetails />} />
                        <Route index path="/forum/create-post/" element={<CreatePost />} />
                        <Route index path="/forum/edit-post/" element={<EditPost />} />
                        <Route index path="/bookmarks" element={<MyBookmarks />} />
                        <Route index path="/activity" element={<MyActivity />} />
                        <Route index path="/leaderboard" element={<Leaderboard />} />
                        <Route index path="/privacy" element={<PrivacyPolicy />} />
                        <Route index path="/terms" element={<Terms />} />
                        <Route index path="/contact" element={<Contact />} />
                        <Route index path="/about" element={<About />} />
                        <Route index path="/credit" element={<Credit />} />
                        <Route index path="/rules" element={<Rules />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
