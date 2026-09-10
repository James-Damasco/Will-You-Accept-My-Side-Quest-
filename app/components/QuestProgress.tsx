"use client";

import { motion } from "framer-motion";

interface QuestProgressProps {
    level: number;
    objective?: string;
}

export default function QuestProgress({ level, objective }: QuestProgressProps) {
    return (
        <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-2xl font-bold tracking-widest text-white/90 mb-2">
                {level === 4 ? "" : `LEVEL ${String(level).padStart(2, "0")}`}
            </h2>
            {objective && (
                <p className="text-sm text-accent-pink/80 tracking-wider uppercase">
                    {objective}
                </p>
            )}
        </motion.div>
    );
}
