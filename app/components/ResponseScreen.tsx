"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { confessionData, ResponseType } from "@/lib/confessionData";
import { audioManager } from "@/lib/audioManager";
import { storage } from "@/lib/storage";

interface ResponseScreenProps {
    onResponse: (response: ResponseType) => void;
}

export default function ResponseScreen({ onResponse }: ResponseScreenProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const reducedMotion = storage.getReducedMotion();
    const data = confessionData.levels[4];

    const handleSelect = (choiceId: ResponseType) => {
        setSelected(choiceId);
        audioManager.playSound("click");

        setTimeout(() => {
            if (choiceId === "yes") {
                audioManager.playSound("celebration");
            }
            onResponse(choiceId);
        }, 400);
    };

    return (
        <div className="text-center max-w-lg mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <p className="text-sm text-accent-pink/70 tracking-wider uppercase mb-2">
                    {data.intro}
                </p>
                <p className="text-xl text-white/80 whitespace-pre-line">
                    {data.message}
                </p>
            </motion.div>

            <div className="space-y-4">
                {data.choices?.map((choice, i) => (
                    <motion.button
                        key={choice.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                        whileHover={reducedMotion ? {} : { scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={selected !== null}
                        className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
              ${selected === choice.id ? "ring-2 ring-white" : ""}
              ${choice.id === "yes"
                                ? "bg-accent-pink/10 border-accent-pink/30 hover:bg-accent-pink/20"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }
              ${selected !== null && selected !== choice.id ? "opacity-40" : ""}
            `}
                        onClick={() => handleSelect(choice.id as ResponseType)}
                    >
                        <span className="text-3xl mr-4 inline-block">
                            {choice.emoji}
                        </span>
                        <span className={`text-lg font-medium ${choice.id === "yes" ? "text-accent-pink" : "text-white/90"
                            }`}>
                            {choice.text}
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
