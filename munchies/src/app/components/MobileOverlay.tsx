"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";

/** Component that shows a full-screen overlay on mobile devices for first-time visitors */
const MobileOverlay = () => { 
    const [isVisible, setIsVisible] = useState(false); // Controls visibility of the overlay
    const [isClient, setIsClient] = useState(false); // Flag to check if the component is running on the client side

    /** Check if the current screen width is mobile and whether the user has already seen the overlay */
    const checkMobileView = () => {
        if (window.innerWidth < 768 && !hasSeenOverlay()) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    /** Helper function to check if the user has previously seen the overlay */
    const hasSeenOverlay = () => { 
        return localStorage.getItem("hasSeenOverlay") === "true";
    };

    /** Handle user action to dismiss the overlay */
    const handleEnter = () => { 
        setIsVisible(false);
        localStorage.setItem("hasSeenOverlay", "true");
    };

    // useEffect to handle initial load and resize logic
    useEffect(() => { 
        setIsClient(true); // Ensure the component is running on the client

        if (isClient && !hasSeenOverlay()) {
            checkMobileView(); // Initial check on mount
        }

        if (isClient) {
            window.addEventListener("resize", checkMobileView); // Listen for window resize events to toggle visibility dynamically

            return () => {
                window.removeEventListener("resize", checkMobileView); // Clean up the event listener on unmount
            };
        }
    }, [isClient]);

    // useEffect to control page scrolling based on overlay visibility
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isVisible]);

    if (!isVisible) return null; // Do not render anything if the overlay is not visible

    return (
        <div className="fixed inset-0 bg-green grid grid-cols-4 justify-between z-50 p-6">
            <span className="pt-10 col-span-4">
                <Image
                    src="/icons/logo.svg"
                    alt="Logo"
                    fill
                    className="!h-6 !w-auto !relative object-contain"
                    priority
                />
            </span>
            <div className="col-span-3">
                <h1 className="text-heading text-white">Treat yourself.</h1>
                <p className="text-[14px] text-white pt-4">Find the best restaurants in your city and get it delivered to your place!</p>
            </div>
            <Button 
                primary={false} 
                text="Continue" 
                onClick={handleEnter} 
                className="col-span-4 h-fit self-end"
            />
        </div>
    );
};

export default MobileOverlay;
