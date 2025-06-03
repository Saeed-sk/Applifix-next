'use client'
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {Fragment, useState} from "react";
import {IconSelect} from "@/components/ui/icon-select";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import {UserType} from "@/types/auth";

type Props = {
    className?: string
    user?: UserType | null
};

export function NavbarLg(props: Props) {
    const [open, setOpen] = useState(false)
    const {logout} = useAuth()
    return (
        <Sidebar collapsed={!open} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
                 className={cn('h-full absolute top-0 left-0', props.className)}>
            <Menu className={'mt-3 text-light-100 flex flex-col gap-10'}>
                <MenuItem
                    icon={<IconSelect className={cn('text-[60px] transition-all', open && 'opacity-0')}
                                      name={'logo'}/>}>
                    <IconSelect className={'text-[120px]'} name={'logo-text'}/>
                </MenuItem>
                <MenuItem className={'h-[0.5px] w-full bg-primary-500'}> </MenuItem>
                <NavLink link={'/'} icon={'home'} text={'Home'}/>
                <NavLink link={'/chat'} icon={'chat'} text={'Chat'}/>


                {
                    props.user ? (
                        <Fragment>
                            <NavLink link={'/dashboard'} icon={'setting'} text={'Dashboard'}/>
                            <NavLink link={'/list'} icon={'list'} text={'List'}/>
                            <MenuItem onClick={logout} className={'text-danger'}
                                      icon={<IconSelect className={'text-3xl'} name={'exit'}/>}> Sign
                                out </MenuItem>
                        </Fragment>
                    ) : (
                        <NavLink link={'/login'} icon={'login'} text={'Login'}/>
                    )
                }
            </Menu>
        </Sidebar>
    );
}

type LinkProps = {
    link: string
    text: string
    icon: string
}

export function NavLink({link, text, icon}: LinkProps) {
    const pathname = usePathname();
    let active = false;
    if (pathname == link) {
        active = true
    }
    return (
        <MenuItem className={cn('text-lg', active ? 'text-warning-100' : 'text-light-100')}
                  component={<Link href={link}/>}
                  icon={<IconSelect className={'text-2xl'} name={icon}/>}>
            {text}
        </MenuItem>
    )
}