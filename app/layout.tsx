import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Will You Accept My Side Quest?",
    description: "A little side quest I made for someone special.",
    openGraph: {
        title: "Will You Accept My Side Quest?",
        description: "A little side quest I made for someone special.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Will You Accept My Side Quest?",
        description: "A little side quest I made for someone special.",
    },
    icons: {
        icon: "/logo.png"
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-night-900 text-white antialiased">
                {children}
            </body>
        </html>
    );
}