import type {Metadata, Viewport} from "next";
import "./globals.css";
import React from "react";
import {NavbarLg} from "@/components/layout/navbar-lg";
import {Roboto} from "next/font/google";
import {Roboto_Condensed} from "next/font/google";
import {Navbar} from "@/components/layout/navbar";
import {AuthProvider} from "@/store/AuthProvider";
import {InstallPrompt} from "@/components/pwa/InstallPrompt";

export const metadata: Metadata = {
    title: "Applifix - Online Home Appliance Repair Services",
    description: "Applifix is your fast, reliable online solution for booking home appliance repair services. Skilled technicians, 24/7 support, and transparent pricing.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Applifix",
    },
    icons: {
        apple: "/icons/apple-touch-icon.png",
        shortcut: "/icons/favicon.ico",
    },
    keywords: [
        "Applifix",
        "home appliance repair",
        "fridge repair",
        "washing machine repair",
        "dishwasher repair",
        "online repair services",
        "on-site appliance repair",
        "home repair booking"
    ],
    authors: [{ name: "Applifix Team"}],
    creator: "Applifix",
    applicationName: "Applifix",
    generator: "Next.js",
    robots: "index, follow",
    openGraph: {
        title: "Applifix - Online Appliance Repair Services",
        description: "Book expert repair services for your fridge, washer, dishwasher, and more — fast and online with Applifix.",
        type: "website",
        locale: "en_US"
    }
};

export const generateViewport = (): Viewport => ({
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-roboto",
    display: "swap",
});

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-roboto-condensed",
    display: "swap",
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang={'en'} dir="ltr">
        <body
            className={`antialiased ${roboto.variable} ${robotoCondensed.variable} relative min-h-[100svh]`}
        >
            <AuthProvider>
                <Navbar/>
                {children}
                <InstallPrompt />
            </AuthProvider>
        </body>
        </html>
    );
}
