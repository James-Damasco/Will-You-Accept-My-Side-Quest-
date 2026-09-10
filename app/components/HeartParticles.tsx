"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storage } from "@/lib/storage";

interface Heart {
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
}

interface BurstHeart {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

interface HeartParticlesProps {
    intensity?: "low" | "medium" | "high";
    burst?: boolean;
}

export default function HeartParticles({ intensity = "low", burst = false }: HeartParticlesProps) {
    const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);
    const reducedMotion = storage.getReducedMotion();

    const floatingHearts = useMemo<Heart[]>(() => {
        const count = intensity === "high" ? 15 : intensity === "medium" ? 8 : 4;
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: Math.random() * 16 + 8,
            delay: Math.random() * 4,
            duration: Math.random() * 4 + 4,
        }));
    }, [intensity]);

    useEffect(() => {
        if (!burst || reducedMotion) return;

        const hearts: BurstHeart[] = Array.from({ length: 20 }, (_, i) => ({
            id: Date.now() + i,
            x: 50 + (Math.random() - 0.5) * 60,
            y: 50 + (Math.random() - 0.5) * 40,
            rotation: Math.random() * 360,
            scale: Math.random() * 0.8 + 0.4,
        }));

        setBurstHearts(hearts);

        const timer = setTimeout(() => setBurstHearts([]), 4000);
        return () => clearTimeout(timer);
    }, [burst, reducedMotion]);

    if (reducedMotion) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
            {/* Floating hearts */}
            {floatingHearts.map((heart) => (
                <motion.div
                    key={`float-${heart.id}`}
                    className="absolute text-accent-pink/40"
                    style={{
                        left: `${heart.x}%`,
                        fontSize: `${heart.size}px`,
                        bottom: "-20px",
                    }}
                    animate={{
                        y: [0, -window.innerHeight],
                        opacity: [0, 0.6, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    ❤
                </motion.div>
            ))}

            {/* Burst hearts */}
            <AnimatePresence>
                {burstHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-accent-pink"
                        style={{
                            left: `${heart.x}%`,
                            top: `${heart.y}%`,
                            fontSize: "24px",
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: heart.scale * 2,
                            opacity: 0,
                            y: -100,
                            x: (Math.random() - 0.5) * 200,
                            rotate: heart.rotation,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        ❤
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
