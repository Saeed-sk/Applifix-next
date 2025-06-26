import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: {
        default: "Applifix - Dashboard",
        template: "%s | Chat",
    },
    description: "Dashboard Chat of Applifix",
};

export default function DashboardLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={'dashboard-bg min-h-svh flex-center flex-col justify-start w-full h-full pt-20'}>
            {children}
        </main>
    );
}
