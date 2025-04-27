import { motion } from "framer-motion";
import React from "react";

const MotionButton = motion.button;

const CommonButton = ({
    children,
    className = '',
    type = 'button',
    disabled = false,
    ...props
}) => {
    return (
        <MotionButton
            type={type}
            disabled={disabled}
            animate={{
                backgroundPosition: ["0% 0", "200% 0"],
            }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 5,
                ease: "linear",
            }}
            className={`
        inline-flex items-center justify-center gap-2
        text-black font-semibold text-sm md:text-lg
        bg-[length:200%_auto]
        bg-repeat-x
        bg-[linear-gradient(90deg,#facc15,#fb923c,#fb923c,#fb923c,#facc15)]
        px-5 py-2 rounded-full shadow-md cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
            {...props}
        >
            {children}
        </MotionButton>
    );
};

export default CommonButton;
