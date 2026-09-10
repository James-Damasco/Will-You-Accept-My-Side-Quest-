"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { storage } from "@/lib/storage";

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
}

interface ShootingStar {
    id: number;
    x: number;
    y: number;
}

export default function StarBackground() {
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
    const reducedMotion = storage.getReducedMotion();

    const stars = useMemo<Star[]>(() => {
        if (typeof window === "undefined") return [];
        return Array.from({ length: 60 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 2,
        }));
    }, []);

    useEffect(() => {
        if (reducedMotion) return;

        const interval = setInterval(() => {
            const newStar: ShootingStar = {
                id: Date.now(),
                x: Math.random() * 80,
                y: Math.random() * 40,
            };
            setShootingStars((prev) => [...prev.slice(-2), newStar]);

            setTimeout(() => {
                setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
            }, 3000);
        }, 8000);

        return () => clearInterval(interval);
    }, [reducedMotion]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-night" />

            {/* Stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animation: reducedMotion ? "none" : `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                        opacity: reducedMotion ? 0.6 : undefined,
                    }}
                />
            ))}

            {/* Shooting stars */}
            {shootingStars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute w-20 h-px bg-gradient-to-r from-white to-transparent"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        transform: "rotate(-45deg)",
                    }}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{ opacity: 0, x: 300, y: 300 }}
                    transition={{ duration: 2, ease: "linear" }}
                />
            ))}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-900/50 via-transparent to-night-900/30" />
        </div>
    );
}
