import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "1Frame to 3D - AI-Powered Image to 3D Converter",
    description: "Transform any image into an interactive 3D model instantly using AI",
    keywords: ["3D", "AI", "image to 3D", "3D modeling", "computer vision"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={inter.variable}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
