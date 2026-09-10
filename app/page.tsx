"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { confessionData, ResponseType } from "@/lib/confessionData";
import { storage } from "@/lib/storage";
import StarBackground from "./components/StarBackground";
import HeartParticles from "./components/HeartParticles";
import MusicToggle from "./components/MusicToggle";
import LandingScreen from "./components/LandingScreen";
import QuestHeader from "./components/QuestHeader";
import LevelScreen from "./components/LevelScreen";
import FinalConfession from "./components/FinalConfession";
import ResponseScreen from "./components/ResponseScreen";

type Screen = "landing" | "level" | "response" | "final";

export default function Home() {
    const [screen, setScreen] = useState<Screen>("landing");
    const [currentLevel, setCurrentLevel] = useState(0);
    const [response, setResponse] = useState<ResponseType | null>(null);

    const totalLevels = confessionData.levels.length;

    const startQuest = useCallback(() => {
        setCurrentLevel(0);
        setResponse(null);
        setScreen("level");
    }, []);

    const nextLevel = useCallback(() => {
        if (currentLevel < totalLevels - 2) {
            setCurrentLevel((prev) => prev + 1);
        } else if (currentLevel === totalLevels - 2) {
            // After level 4 (index 3), go to response screen
            setCurrentLevel((prev) => prev + 1);
            setScreen("response");
        }
    }, [currentLevel, totalLevels]);

    const handleResponse = useCallback((resp: ResponseType) => {
        setResponse(resp);
        setScreen("final");
    }, []);

    const reset = useCallback(() => {
        setScreen("landing");
        setCurrentLevel(0);
        setResponse(null);
        storage.clearQuestProgress();
    }, []);

    return (
        <main className="relative min-h-[100dvh] overflow-hidden">
            <StarBackground />
            <HeartParticles
                intensity={screen === "final" && response === "yes" ? "high" : "low"}
            />
            <MusicToggle />

            <div className="relative z-20 min-h-[100dvh] flex flex-col">
                <AnimatePresence mode="wait">
                    {screen === "landing" && (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1"
                        >
                            <LandingScreen onStart={startQuest} />
                        </motion.div>
                    )}

                    {screen === "level" && (
                        <motion.div
                            key={`level-${currentLevel}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col px-6 py-8"
                        >
                            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
                                <QuestHeader
                                    currentLevel={currentLevel + 1}
                                    totalLevels={totalLevels}
                                />
                                <LevelScreen
                                    level={confessionData.levels[currentLevel]}
                                    onNext={nextLevel}
                                />
                            </div>
                        </motion.div>
                    )}

                    {screen === "response" && (
                        <motion.div
                            key="response"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col justify-center px-6 py-8"
                        >
                            <ResponseScreen onResponse={handleResponse} />
                        </motion.div>
                    )}

                    {screen === "final" && response && (
                        <motion.div
                            key="final"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1"
                        >
                            <FinalConfession response={response} onReset={reset} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
