import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

// forwardRef allows the parent component (Navbar) to call modal functions
const AuthModal = forwardRef((_, ref) => {
    const modalRef = useRef(null);
    const [mode, setMode] = useState("login");

    // Expose showModal and closeModal functions to parent (Navbar)
    useImperativeHandle(ref, () => ({
        openModal: () => modalRef.current.showModal(),
        closeModal: () => modalRef.current.close(),
    }));

    return (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl md:text-3xl lg:text-4xl">
                        {mode === "login" ? "Login" : "Register"}
                    </h3>
                    <button onClick={() => modalRef.current.close()} className="btn btn-lg">
                        ✕
                    </button>
                </div>

                {/* Pass closeModal function to forms */}
                {mode === "login" ? <LoginForm closeModal={() => modalRef.current.close()} /> : <RegistrationForm closeModal={() => modalRef.current.close()} />}

                <div className="modal-action">
                    <button
                        className="btn btn-link text-yellow-500"
                        onClick={() => setMode(mode === "login" ? "register" : "login")}
                    >
                        {mode === "login"
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </dialog>
    );
});

export default AuthModal;
