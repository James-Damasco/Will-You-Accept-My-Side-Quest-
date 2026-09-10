"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storage } from "@/lib/storage";

interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    rotation: number;
    scale: number;
    delay: number;
}

interface ConfettiEffectProps {
    active: boolean;
}

const colors = ["#ff6b9d", "#c084fc", "#ffd1dc", "#ff8fab", "#e9d5ff", "#fbcfe8"];

export default function ConfettiEffect({ active }: ConfettiEffectProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
    const reducedMotion = storage.getReducedMotion();

    useEffect(() => {
        if (!active || reducedMotion) {
            setPieces([]);
            return;
        }

        const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            scale: Math.random() * 0.6 + 0.4,
            delay: Math.random() * 2,
        }));

        setPieces(newPieces);

        const timer = setTimeout(() => setPieces([]), 6000);
        return () => clearTimeout(timer);
    }, [active, reducedMotion]);

    if (reducedMotion) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
            <AnimatePresence>
                {pieces.map((piece) => (
                    <motion.div
                        key={piece.id}
                        className="absolute w-3 h-3 rounded-sm"
                        style={{
                            left: `${piece.x}%`,
                            backgroundColor: piece.color,
                            top: "-10px",
                        }}
                        initial={{ y: 0, opacity: 1, rotate: 0, scale: piece.scale }}
                        animate={{
                            y: window.innerHeight + 20,
                            opacity: [1, 1, 0],
                            rotate: piece.rotation + 720,
                            x: (Math.random() - 0.5) * 200,
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            delay: piece.delay,
                            ease: "easeIn",
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
