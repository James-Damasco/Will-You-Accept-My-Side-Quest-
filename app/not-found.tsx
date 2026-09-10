import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 bg-night-900">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl font-bold text-white mb-4">Quest Not Found</h1>
            <p className="text-white/60 mb-8">This side quest doesn't seem to exist.</p>

            <Link href="/" className="px-6 py-3 bg-accent-pink/20 border border-accent-pink/30 rounded-full text-accent-pink hover:bg-accent-pink/30 transition-colors">
                Return to Main Quest
            </Link>
        </div>
    );
}