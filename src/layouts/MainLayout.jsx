import { Outlet } from "react-router-dom";
import { useRef } from "react";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import AuthModal from "../components/Common/AuthModal";
import AnnouncementModal from "../components/Common/AnnouncementModal";

const MainLayout = () => {
    const modalRef = useRef(null);  // Create a ref for the modal

    return (
        <div>
            {/* Pass modalRef to Navbar */}
            <Navbar modalRef={modalRef} />
            <Header />

            {/* Pass the same ref to AuthModal */}
            <AuthModal ref={modalRef} />
            <AnnouncementModal />

            <main className="min-h-screen">
                <Outlet context={modalRef} />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
