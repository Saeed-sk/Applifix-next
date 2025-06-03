import RegisterForm from "@/components/pages/auth/register-form";
import Link from "next/link";
import {Title} from "@/components/shared/title";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Fragment} from "react";

export default function RegisterPage() {
    return (
        <Fragment>
            <div className={'tex-white flex-center flex-col'}>
                <Title className={'text-white text-[30px] lg:text-[60px]'}>
                    Create Account
                </Title>
                <Title className={'!text-white text-16 lg:text-24'}>
                    Already have an account? <Link className={'text-blue-700 text-14 lg:text-24'}
                                                   href={'/login'}>Sign in</Link>
                </Title>
            </div>
            <div
                className="max-w-[1053px] bg-transparent lg:bg-[#F0F0F3] pt-20 rounded-20 overflow-hidden lg:pt-0 w-full flex-center flex-row-reverse lg:h-[649px] gap-5">
                <div className={'max-w-[360px] w-full p-5'}>
                    <RegisterForm/>
                    <p className="mt-4 text-center">
                        <Link href="/register" className="text-blue-600"></Link>
                    </p>
                </div>
                <AspectRatio className={'aspect-square relative w-full h-full hidden lg:block'}>
                    <Image src={'/assets/signin.png'} className={'aspect-square object-cover w-full h-full'} priority
                           fill
                           sizes={'80svw'}
                           alt={'login bg'}/>
                </AspectRatio>
            </div>
        </Fragment>
    );
}