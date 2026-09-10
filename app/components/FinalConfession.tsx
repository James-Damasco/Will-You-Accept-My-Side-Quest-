"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { confessionData, ResponseType } from "@/lib/confessionData";
import { audioManager } from "@/lib/audioManager";
import { storage } from "@/lib/storage";
import ConfettiEffect from "./ConfettiEffects";
import HeartParticles from "./HeartParticles";

interface FinalConfessionProps {
    response: ResponseType;
    onReset: () => void;
}

export default function FinalConfession({ response, onReset }: FinalConfessionProps) {
    const [showContent, setShowContent] = useState(false);
    const reducedMotion = storage.getReducedMotion();

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleReset = () => {
        audioManager.playSound("click");
        onReset();
    };

    const renderYes = () => {
        const data = confessionData.responses.yes;
        return (
            <motion.div
                className="text-center max-w-lg mx-auto py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <ConfettiEffect active={showContent} />
                <HeartParticles intensity="high" burst={showContent} />

                <motion.div
                    initial={reducedMotion ? {} : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                >
                    <p className="text-sm text-accent-pink/70 tracking-wider uppercase mb-4">
                        {data.title}
                    </p>
                    <div className="text-4xl mb-4">{data.hearts}</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                        {data.surprise}
                    </h2>
                </motion.div>

                <motion.p
                    className="text-xl text-white/80 mb-4 whitespace-pre-line"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    {data.message}
                </motion.p>

                <motion.p
                    className="text-lg text-white/60 whitespace-pre-line mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    {data.closing}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink transition-colors translate-y-8"
                    onClick={handleReset}
                >
                    {data.buttonText}
                </motion.button>
            </motion.div>
        );
    };

    const renderMaybe = () => {
        const data = confessionData.responses.maybe;
        return (
            <motion.div
                className="text-center max-w-lg mx-auto py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.p
                    className="text-2xl text-white/90 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {data.message}
                </motion.p>

                <motion.p
                    className="text-lg text-white/70 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {data.subtext}
                </motion.p>

                <motion.p
                    className="text-white/60 whitespace-pre-line mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {data.respect}
                </motion.p>

                <motion.p
                    className="text-accent-pink/70 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    {data.closing}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink transition-colors"
                    onClick={handleReset}
                >
                    {data.buttonText}
                </motion.button>
            </motion.div>
        );
    };

    const renderFriend = () => {
        const data = confessionData.responses.friend;
        return (
            <motion.div
                className="text-center max-w-lg mx-auto py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.p
                    className="text-2xl text-white/90 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {data.message}
                </motion.p>

                <motion.p
                    className="text-lg text-white/70 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {data.thanks}
                </motion.p>

                <motion.p
                    className="text-white/60 whitespace-pre-line mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {data.respect}
                </motion.p>

                <motion.p
                    className="text-white/50 whitespace-pre-line mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    {data.closing}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink transition-colors"
                    onClick={handleReset}
                >
                    {data.buttonText}
                </motion.button>
            </motion.div>
        );
    };

    return (
        <AnimatePresence>
            {showContent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[100dvh] flex items-center justify-center px-6"
                >
                    {response === "yes" && renderYes()}
                    {response === "maybe" && renderMaybe()}
                    {response === "friend" && renderFriend()}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
