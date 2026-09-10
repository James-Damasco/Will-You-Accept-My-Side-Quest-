"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { storage } from "@/lib/storage";
import { audioManager } from "@/lib/audioManager";
import { confessionData } from "@/lib/confessionData";

export default function MusicToggle() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const saved = storage.getMusicPreference();
        setEnabled(saved);
        audioManager.setEnabled(saved);

        if (saved) {
            audioManager.playMusic("backgroundMusic");
        }
    }, []);

    const toggle = () => {
        const newState = !enabled;
        setEnabled(newState);
        audioManager.setEnabled(newState);
        storage.setMusicPreference(newState);

        if (newState) {
            audioManager.playMusic("backgroundMusic");
        } else {
            audioManager.stopMusic();
        }

        audioManager.playSound("click");
    };

    return (
        <motion.button
            onClick={toggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink"
            aria-label={enabled ? "Turn music off" : "Turn music on"}
            whileTap={{ scale: 0.9 }}
        >
            {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
    );
}
