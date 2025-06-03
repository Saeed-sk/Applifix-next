import React, {Fragment} from "react";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={'bg-transparent lg:bg-white'}>
            <img className={'absolute w-[100%] h-[250px] lg:h-auto object-cover'} src="/assets/login-bg.svg"
                 alt="login png"/>
            <main className={'flex-center w-full relative min-h-svh flex-col justify-between pt-10 gap-10'}>
                {children}
                <div/>
            </main>
        </div>
    );
}
