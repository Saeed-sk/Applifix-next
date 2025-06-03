'use client'
import {NavbarLg} from "@/components/layout/navbar-lg";
import {NavbarSm} from "@/components/layout/navbar-sm";
import {useAuth} from "@/hooks/useAuth";

type Props = {};

export function Navbar(props: Props) {
    const {user, loading} = useAuth()
    if (loading) {
        return null
    }
    return (
        <nav className={'h-auto lg:h-full w-full lg:w-auto fixed z-[99999] bottom-0 lg:bottom-auto lg:top-0 left-0'}>
            <NavbarLg user={user} className={'hidden lg:block'}/>
            <NavbarSm user={user} className={'flex lg:hidden'}/>
        </nav>
    );
}