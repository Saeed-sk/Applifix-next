'use client'
import Link from "next/link";
import {IconSelect} from "@/components/ui/icon-select";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import {useAuth} from "@/hooks/useAuth";
import {Fragment} from "react";
import {UserType} from "@/types/auth";

type Props = {
    className?: string
    user?: UserType | null
};

export function NavbarSm(props: Props) {
    const {logout} = useAuth()
    return (
        <div
            className={cn('flex-center gap-[50px] bg-dark-100 mx-auto w-[95%] p-2 rounded-full mb-2 h-[70px]', props.className)}>
            <NavLink link={'/'} icon={'home'} text={'Home'}/>
            <NavLink link={'/chat'} icon={'chat'} text={'Chat'}/>

            {props.user ? (
                <Fragment>
                    <NavLink link={'/list'} icon={'list'} text={'List'}/>
                    <NavLink link={'/dashboard'} icon={'setting'} text={'Dashboard'}/>
                    <button onClick={() => logout()} className={'flex-center flex-col text-danger'}>
                        <IconSelect name={'exit'} className={'text-4xl h-8 w-8'}/>
                    </button>
                </Fragment>

            ) : (
                <NavLink link={'/login'} icon={'login'} text={'Login'}/>
            )}
        </div>
    );
}

type LinkProps = {
    link: string
    icon: string
    text: string
}

function NavLink({link, text, icon}: LinkProps) {
    const pathname = usePathname();
    let active = false;
    if (pathname == link) {
        active = true
    }
    return (
        <Link href={link}
              className={cn('', active ? 'block text-warning-100 flex-center flex-col gap-0' : 'text-light-100')}>
            <div className={'flex-center flex-col'}>
                <IconSelect name={icon} className={'text-3xl h-8 w-8'}/>
                <AnimatePresence>
                    <motion.h2 initial={{scaleY: 0, height: 0}}
                               animate={{scaleY: active ? 1 : 0, height: active ? 'auto' : 0}}
                               className={cn('text-12 font-medium')}>{text}</motion.h2>
                </AnimatePresence>
            </div>
        </Link>
    )
}