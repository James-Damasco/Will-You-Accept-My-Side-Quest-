class AudioManager {
    private audioElements: Map<string, HTMLAudioElement> = new Map();
    private musicEnabled: boolean = false;
    private currentMusic: HTMLAudioElement | null = null;

    preloadSound(name: string, src: string): void {
        if (typeof window === "undefined") return;
        try {
            const audio = new Audio(src);
            audio.preload = "auto";
            this.audioElements.set(name, audio);
        } catch {
            // Silently fail if audio can't be created
        }
    }

    playSound(name: string): void {
        if (!this.musicEnabled) return;
        const audio = this.audioElements.get(name);
        if (audio) {
            try {
                const clone = audio.cloneNode() as HTMLAudioElement;
                clone.volume = 0.5;
                clone.play().catch(() => { });
            } catch {
                // Silently fail
            }
        }
    }

    playMusic(name: string): void {
        if (!this.musicEnabled) return;
        this.stopMusic();
        const audio = this.audioElements.get(name);
        if (audio) {
            try {
                audio.loop = true;
                audio.volume = 0.3;
                audio.currentTime = 0;
                audio.play().catch(() => { });
                this.currentMusic = audio;
            } catch {
                // Silently fail
            }
        }
    }

    stopMusic(): void {
        if (this.currentMusic) {
            try {
                this.currentMusic.pause();
                this.currentMusic.currentTime = 0;
            } catch {
                // Silently fail
            }
            this.currentMusic = null;
        }
    }

    setEnabled(enabled: boolean): void {
        this.musicEnabled = enabled;
        if (!enabled) {
            this.stopMusic();
        }
    }

    isEnabled(): boolean {
        return this.musicEnabled;
    }
}

export const audioManager = new AudioManager();
