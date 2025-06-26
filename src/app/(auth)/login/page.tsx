import LoginForm from "@/components/pages/auth/login-form";
import Link from "next/link";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Fragment} from "react";
import {Title} from "@/components/shared/title";
export const metadata = {
    title: 'Applifix login',
};

export function generateViewport() {
    return {
        viewport: {
            width: 'device-width',
            initialScale: 1,
        },
        themeColor: [
            { media: '(prefers-color-scheme: light)', color: '#fff' },
            { media: '(prefers-color-scheme: dark)', color: '#fff' },
        ],
    };
}

export default function LoginPage() {
    return (
        <Fragment>
            <div className={'tex-white flex-center flex-col'}>
                <Title className={'text-white text-[30px] lg:text-[60px]'}>
                    Sign in to your Account
                </Title>
                <Title className={'!text-white text-16 lg:text-24'}>
                    Don’t have an account? <Link className={'text-blue-700 text-14 lg:text-24'} href={'/register'}>Sign
                    Up</Link>
                </Title>
            </div>
            <div
                className="max-w-[1053px] bg-transparent lg:bg-[#F0F0F3] pt-20 rounded-20 overflow-hidden lg:pt-0 w-full flex-center lg:h-[649px] gap-5">
                <div className={'max-w-[360px] w-full p-8'}>
                    <LoginForm/>
                    <p className="mt-4 text-center">
                        <Link href="/register" className="text-blue-600"></Link>
                    </p>
                </div>
                <AspectRatio className={'aspect-square relative w-full h-full hidden lg:block'}>
                    <Image src={'/assets/login.png'} className={'aspect-square object-cover w-full h-full'} priority
                           fill
                           sizes={'80svw'}
                           alt={'login bg'}/>
                </AspectRatio>
            </div>
        </Fragment>
    );
}