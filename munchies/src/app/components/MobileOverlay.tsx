"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";

const MobileOverlay = () => { 
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const checkMobileView = () => {
        if (window.innerWidth < 768 && !hasSeenOverlay()) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const hasSeenOverlay = () => { 
        return localStorage.getItem("hasSeenOverlay") === "true";
    };

    const handleEnter = () => { 
        setIsVisible(false);
        localStorage.setItem("hasSeenOverlay", "true");
    };

    useEffect(() => { 

        setIsClient(true);

        if (isClient && !hasSeenOverlay()) {
            checkMobileView();
        }

        if (isClient) {
            window.addEventListener("resize", checkMobileView);

            return () => {
                window.removeEventListener("resize", checkMobileView);
            };
        }
    }, [isClient]);

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

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-green grid grid-cols-4 justify-between z-50 p-6">
            <span className="pt-10 col-span-4">
                <Image
                    src="/icons/logo.svg"
                    alt="Logo"
                    fill
                    className="!h-[24px] !w-auto !relative object-contain"
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
