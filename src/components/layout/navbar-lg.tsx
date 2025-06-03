'use client'
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {useState} from "react";
import {IconSelect} from "@/components/ui/icon-select";
import {cn} from "@/lib/utils";
import Link from "next/link";

type Props = {
    className?: string
};

export function NavbarLg(props: Props) {
    const [open, setOpen] = useState(false)
    return (
        <nav className={cn('h-full absolute top-0 left-0', props.className)}>
            <Sidebar collapsed={!open} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
                     className={'h-full bg-dark-100'}>
                <Menu className={'mt-3 text-light-100 text-xl flex flex-col gap-10'}>
                    <MenuItem
                        icon={<IconSelect className={cn('text-[60px] transition-all', open && 'opacity-0')}
                                          name={'logo'}/>}>
                        <IconSelect className={'text-[120px]'} name={'logo-text'}/>
                    </MenuItem>
                    <MenuItem className={'h-[0.5px] w-full bg-primary-500'}> </MenuItem>
                    <MenuItem component={<Link href={'/'}/>} icon={<IconSelect className={'text-3xl'} name={'home'}/>}>
                        Home
                    </MenuItem>
                    <MenuItem component={<Link href={'/chat'}/>}
                              icon={<IconSelect className={'text-3xl'} name={'chat'}/>}> Chat </MenuItem>
                    <MenuItem component={<Link href={'/dashboard'}/>}
                              icon={<IconSelect className={'text-3xl'} name={'setting'}/>}> Dashboard </MenuItem>
                    <MenuItem component={<Link href={'/lists'}/>}
                              icon={<IconSelect className={'text-3xl'} name={'list'}/>}> List </MenuItem>
                    <MenuItem
                        icon={<IconSelect className={'text-3xl'} name={'notification'}/>}> Notification </MenuItem>
                    <MenuItem className={'text-danger'} icon={<IconSelect className={'text-3xl'} name={'exit'}/>}> Sign
                        out </MenuItem>
                </Menu>
            </Sidebar>
        </nav>
    );
};