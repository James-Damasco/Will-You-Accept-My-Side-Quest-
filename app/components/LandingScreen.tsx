"use client";

import { motion } from "framer-motion";
import { confessionData } from "@/lib/confessionData";
import { audioManager } from "@/lib/audioManager";
import { storage } from "@/lib/storage";

interface LandingScreenProps {
    onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
    const reducedMotion = storage.getReducedMotion();

    const handleStart = () => {
        audioManager.playSound("click");
        onStart();
    };

    return (
        <motion.div
            className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="text-center max-w-lg"
                initial={reducedMotion ? {} : { y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.div
                    className="text-6xl mb-8"
                    animate={reducedMotion ? {} : { y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    🎮
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
                    {confessionData.landing.title}
                </h1>

                <p className="text-lg text-white/70 mb-4">
                    {confessionData.landing.subtitle}
                </p>

                <p className="text-white/50 whitespace-pre-line mb-12">
                    {confessionData.landing.reassurance}
                </p>

                <motion.button
                    onClick={handleStart}
                    className="px-10 py-4 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-lg rounded-full
            shadow-lg shadow-accent-pink/25 hover:shadow-accent-pink/40
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-night-900
            transition-all duration-300"
                    whileHover={reducedMotion ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {confessionData.landing.buttonText}
                </motion.button>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">
                QUEST ID: #{Math.random().toString(36).slice(2, 8).toUpperCase()}
            </div>
        </motion.div>
    );
}
