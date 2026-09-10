"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";

interface ClueCardProps {
    clue: string;
    index: number;
    delay?: number;
}

export default function ClueCard({ clue, index, delay = 0 }: ClueCardProps) {
    const [revealed, setRevealed] = useState(false);
    const reducedMotion = storage.getReducedMotion();

    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <motion.div
            className={`relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
        ${revealed ? "opacity-100" : "opacity-0"}`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.9 }}
            animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-pink/20 flex items-center justify-center">
                    <span className="text-accent-pink font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
                <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
                    {clue}
                </p>
            </div>
        </motion.div>
    );
}
