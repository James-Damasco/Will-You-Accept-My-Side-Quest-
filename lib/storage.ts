const STORAGE_KEYS = {
    musicPreference: "sidequest_music",
    reducedMotion: "sidequest_reduced_motion",
    questProgress: "sidequest_progress",
} as const;

function safeGet<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item) as T;
    } catch {
        return defaultValue;
    }
}

function safeSet<T>(key: string, value: T): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

export const storage = {
    getMusicPreference: (): boolean => safeGet(STORAGE_KEYS.musicPreference, false),
    setMusicPreference: (enabled: boolean): boolean => safeSet(STORAGE_KEYS.musicPreference, enabled),

    getReducedMotion: (): boolean => {
        if (typeof window === "undefined") return false;
        const systemPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return safeGet(STORAGE_KEYS.reducedMotion, systemPrefersReduced);
    },
    setReducedMotion: (enabled: boolean): boolean => safeSet(STORAGE_KEYS.reducedMotion, enabled),

    getQuestProgress: (): number | null => safeGet<number | null>(STORAGE_KEYS.questProgress, null),
    setQuestProgress: (level: number | null): boolean => safeSet(STORAGE_KEYS.questProgress, level),
    clearQuestProgress: (): boolean => safeSet(STORAGE_KEYS.questProgress, null),
};
