"use client";

import { motion } from "framer-motion";
import { confessionData } from "@/lib/confessionData";

interface QuestHeaderProps {
    currentLevel: number;
    totalLevels: number;
}

export default function QuestHeader({ currentLevel, totalLevels }: QuestHeaderProps) {
    const progress = (currentLevel / totalLevels) * 100;

    return (
        <motion.div
            className="w-full max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-white/60 font-medium tracking-wider">
                    {confessionData.quest.subtitle}
                </span>
                <span className="text-accent-pink font-medium tracking-wider">
                    {confessionData.quest.title}
                </span>
            </div>

            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-pink to-accent-purple rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>

            <div className="mt-2 text-center">
                <span className="text-xs text-white/50 tracking-widest">
                    LEVEL {String(currentLevel).padStart(2, "0")} / {String(totalLevels).padStart(2, "0")}
                </span>
            </div>
        </motion.div>
    );
}
