'use client'

import {NavbarLg} from "@/components/layout/navbar-lg";
import {NavbarSm} from "@/components/layout/navbar-sm";

type Props = {};

export function Navbar(props: Props) {
    return (
        <nav className={'h-auto lg:h-full w-full lg:w-auto fixed z-[99999] bottom-0 lg:bottom-auto lg:top-0 left-0'}>
            <NavbarLg className={'hidden lg:block'}/>
            <NavbarSm className={'flex lg:hidden'}/>
        </nav>
    );
}