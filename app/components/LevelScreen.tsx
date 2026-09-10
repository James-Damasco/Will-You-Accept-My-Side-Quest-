"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { confessionData, LevelData } from "@/lib/confessionData";
import { audioManager } from "@/lib/audioManager";
import { storage } from "@/lib/storage";
import TypewriterText from "./TypewriterText";
import QuestProgress from "./QuestProgress";
import ClueCard from "./ClueCard";

interface LevelScreenProps {
    level: LevelData;
    onNext: () => void;
}

export default function LevelScreen({ level, onNext }: LevelScreenProps) {
    const [step, setStep] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const reducedMotion = storage.getReducedMotion();

    const handleNext = () => {
        audioManager.playSound("click");
        onNext();
    };

    const renderLevel1 = () => (
        <div className="text-center">
            <QuestProgress level={level.id} objective={level.objective} />
            <div className="space-y-6 min-h-[120px]">
                {level.messages?.map((msg, i) => (
                    <p key={i} className="text-xl md:text-2xl text-white/90 leading-relaxed whitespace-pre-line">
                        {i === 0 ? (
                            <TypewriterText
                                text={msg}
                                speed={60}
                                delay={500}
                                onComplete={() => setStep(1)}
                            />
                        ) : i <= step ? (
                            <TypewriterText
                                text={msg}
                                speed={60}
                                delay={800}
                                onComplete={() => i === level.messages.length - 1 && setShowButton(true)}
                            />
                        ) : null}
                    </p>
                ))}
            </div>
            <AnimatePresence>
                {showButton && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink transition-colors"
                        onClick={handleNext}
                    >
                        {level.buttonText}
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );

    const renderLevel2 = () => {
        const data = level as typeof confessionData.levels[1];
        const [cluesRevealed, setCluesRevealed] = useState(0);
        const [showAfterClues, setShowAfterClues] = useState(false);

        return (
            <div className="text-center max-w-lg mx-auto">
                <QuestProgress level={level.id} />
                <p className="text-xl text-white/80 mb-8 whitespace-pre-line">
                    {data.intro}
                </p>

                <div className="space-y-4 mb-8">
                    {data.clues?.map((clue, i) => (
                        <ClueCard
                            key={i}
                            clue={clue}
                            index={i}
                            delay={i * 1500 + 500}
                        />
                    ))}
                </div>

                <TypewriterText
                    text={data.afterClues ?? ""}
                    delay={(data.clues?.length ?? 0) * 1500 + 1000}
                    onComplete={() => setShowAfterClues(true)}
                    className="text-lg text-accent-pink/80 mb-8 block"
                />

                <AnimatePresence>
                    {showAfterClues && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink transition-colors"
                            onClick={handleNext}
                        >
                            {data.buttonText}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const renderLevel3 = () => {
        const data = level as typeof confessionData.levels[2];
        const [messageIndex, setMessageIndex] = useState(0);
        const [showButton, setShowButton] = useState(false);

        return (
            <div className="text-center max-w-lg mx-auto">
                <QuestProgress level={level.id} />
                <div className="space-y-8 min-h-[200px]">
                    {data.messages?.map((msg, i) => (
                        <motion.p
                            key={i}
                            className="text-xl md:text-2xl text-white/90 leading-relaxed whitespace-pre-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: i <= messageIndex ? 1 : 0 }}
                        >
                            {i <= messageIndex && (
                                <TypewriterText
                                    text={msg}
                                    speed={55}
                                    delay={i === 0 ? 500 : 1200}
                                    onComplete={() => {
                                        if (i < data.messages.length - 1) {
                                            setTimeout(() => setMessageIndex(i + 1), 800);
                                        } else {
                                            setShowButton(true);
                                        }
                                    }}
                                />
                            )}
                        </motion.p>
                    ))}
                </div>

                <AnimatePresence>
                    {showButton && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink transition-colors"
                            onClick={handleNext}
                        >
                            {data.buttonText}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const renderLevel4 = () => {
        const data = level as typeof confessionData.levels[3];
        const [phase, setPhase] = useState(0);

        return (
            <div className="text-center max-w-2xl mx-auto">
                {phase === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <QuestProgress level={level.id} objective={data.objective} />
                        <motion.button
                            className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium"
                            onClick={() => {
                                audioManager.playSound("click");
                                setPhase(1);
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {data.buttonText}
                        </motion.button>
                    </motion.div>
                )}

                {phase === 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12"
                    >
                        <motion.h2
                            className="text-6xl md:text-8xl font-serif text-white text-glow mb-12"
                            initial={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            {data.mainConfession}
                        </motion.h2>

                        <div className="space-y-6 mb-8">
                            {data.messages?.map((msg, i) => (
                                <motion.p
                                    key={i}
                                    className="text-lg md:text-xl text-white/80 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2 + i * 1.5 }}
                                >
                                    {msg}
                                </motion.p>
                            ))}
                        </div>

                        <motion.div
                            className="text-4xl mb-8"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 5, type: "spring" }}
                        >
                            {data.heartSymbol}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 6 }}
                        >
                            <p className="text-sm text-accent-pink/70 tracking-wider uppercase mb-2">
                                {data.finalPrompt}
                            </p>
                            <p className="text-white/80 mb-8">{data.finalText}</p>
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-accent-pink to-accent-purple rounded-full text-white font-medium
                  hover:shadow-lg hover:shadow-accent-pink/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                onClick={handleNext}
                            >
                                {data.buttonText}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        );
    };

    const renderLevel5 = () => {
        const data = level as typeof confessionData.levels[4];

        return (
            <div className="text-center max-w-lg mx-auto">
                <QuestProgress level={level.id} />
                <motion.p
                    className="text-sm text-accent-pink/70 tracking-wider uppercase mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {data.intro}
                </motion.p>
                <motion.p
                    className="text-xl text-white/80 mb-12 whitespace-pre-line"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {data.message}
                </motion.p>

                <div className="space-y-4">
                    {data.choices?.map((choice, i) => (
                        <motion.button
                            key={choice.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.2 }}
                            whileHover={reducedMotion ? {} : { scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-6 rounded-2xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                ${choice.id === "yes"
                                    ? "bg-accent-pink/10 border-accent-pink/30 hover:bg-accent-pink/20"
                                    : choice.id === "maybe"
                                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                                        : "bg-white/5 border-white/10 hover:bg-white/10"
                                }`}
                            onClick={() => {
                                audioManager.playSound("click");
                                onNext();
                            }}
                        >
                            <span className="text-2xl mr-4">{choice.emoji}</span>
                            <span className={`text-lg font-medium ${choice.id === "yes" ? "text-accent-pink" : "text-white/80"
                                }`}>
                                {choice.text}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    };

    switch (level.id) {
        case 1: return renderLevel1();
        case 2: return renderLevel2();
        case 3: return renderLevel3();
        case 4: return renderLevel4();
        case 5: return renderLevel5();
        default: return null;
    }
}
