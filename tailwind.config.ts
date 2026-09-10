import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                night: {
                    900: "#0a0e27",
                    800: "#111840",
                    700: "#1a2047",
                },
                accent: {
                    pink: "#ff6b9d",
                    purple: "#c084fc",
                    soft: "#ffd1dc",
                },
            },
            fontFamily: {
                serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
                sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
            },
            animation: {
                "twinkle": "twinkle 3s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "shoot": "shoot 3s linear forwards",
            },
            keyframes: {
                twinkle: {
                    "0%, 100%": { opacity: "0.3" },
                    "50%": { opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shoot: {
                    "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
                    "100%": { transform: "translateX(300px) translateY(300px)", opacity: "0" },
                },
            },
        },
    },
    plugins: [],
};
export default config;