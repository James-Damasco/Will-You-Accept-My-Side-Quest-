"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { storage } from "@/lib/storage";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
    className?: string;
}

export default function TypewriterText({
    text,
    speed = 50,
    delay = 0,
    onComplete,
    className = "",
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const onCompleteRef = useRef(onComplete);

    // Always keep the latest callback without restarting the animation
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const reducedMotion = storage.getReducedMotion();

    useEffect(() => {
        // Reset whenever the text changes
        setDisplayed("");

        if (reducedMotion) {
            setDisplayed(text);
            onCompleteRef.current?.();
            return;
        }

        let index = 0;
        let interval: ReturnType<typeof setInterval> | undefined;
        let startTimer: ReturnType<typeof setTimeout> | undefined;

        startTimer = setTimeout(() => {
            setIsTyping(true);

            interval = setInterval(() => {
                index++;

                setDisplayed(text.slice(0, index));

                if (index >= text.length) {
                    if (interval) {
                        clearInterval(interval);
                    }

                    setIsTyping(false);
                    onCompleteRef.current?.();
                }
            }, speed);
        }, delay);

        return () => {
            if (startTimer) {
                clearTimeout(startTimer);
            }

            if (interval) {
                clearInterval(interval);
            }

            setIsTyping(false);
        };
    }, [text, speed, delay, reducedMotion]);

    return (
        <motion.span
            className={`inline-block whitespace - pre - wrap ${className} `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayed}

            {!reducedMotion && isTyping && (
                <span className="animate-pulse">|</span>
            )}
        </motion.span>
    );
}

