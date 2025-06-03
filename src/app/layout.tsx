import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {NavbarLg} from "@/components/layout/navbar-lg";
import {Roboto} from "next/font/google";
import {Roboto_Condensed} from "next/font/google";
import {Navbar} from "@/components/layout/navbar";

export const metadata: Metadata = {
    title: "Applifix - Online Home Appliance Repair Services",
    description: "Applifix is your fast, reliable online solution for booking home appliance repair services. Skilled technicians, 24/7 support, and transparent pricing.",
    // keywords: [
    //     "Applifix",
    //     "home appliance repair",
    //     "fridge repair",
    //     "washing machine repair",
    //     "dishwasher repair",
    //     "online repair services",
    //     "on-site appliance repair",
    //     "home repair booking"
    // ],
    // authors: [{ name: "Applifix Team"}],
    // creator: "Applifix",
    // applicationName: "Applifix",
    // generator: "Next.js",
    // robots: "index, follow",
    // openGraph: {
    //     title: "Applifix - Online Appliance Repair Services",
    //     description: "Book expert repair services for your fridge, washer, dishwasher, and more — fast and online with Applifix.",
    //     type: "website",
    //     locale: "en_US"
    // }
};

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
        <html lang={'en'}>
        <body
            className={`antialiased ${roboto.variable} ${robotoCondensed.variable} relative min-h-[100svh]`}
        >
        <Navbar/>
        {children}
        </body>
        </html>
    );
}
