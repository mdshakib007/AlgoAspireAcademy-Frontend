import { Outlet } from "react-router-dom";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

const MainLayout = () => {
    const modalRef = useRef(null);  // Create a ref for the modal

    return (
        <div>
            {/* Pass modalRef to Navbar */}
            <Navbar modalRef={modalRef} />
            <Header />
            
            {/* Pass the same ref to AuthModal */}
            <AuthModal ref={modalRef} />

            <main className="min-h-screen">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
