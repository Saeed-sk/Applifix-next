'use client'
import * as React from 'react';
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {env} from "@/env";
import {useAuth} from "@/hooks/useAuth";
import {cn} from "@/lib/utils";
import {Title} from "@/components/shared/title";
import {IconSelect} from "@/components/ui/icon-select";

type Props = {};

export function UserAvatar(props: Props) {
    const {loading, user} = useAuth()
    if (loading || !user) return null
    return (
        <div className={'flex-center w-full justify-between max-w-1440'}>
            <div className={'flex max-w-1440 px-10 mb-10 text-light-100'}>
                <AspectRatio
                    className={cn('self-end  rounded-full border border-gray-300 w-[100px] lg:w-[150px] h-[100px] lg:h-[150px] flex-center mr-2', user?.avatar ? ' border-4 ' : 'bg-white')}
                    ratio={1}>
                    <Image src={user ? env.NEXT_PUBLIC_IMAGE_DIRECTORY + user.avatar : '/assets/user-avatar.svg'}
                           className={'static w-full h-full object-contain pt-2'}
                           fill={true} sizes={'50svw'} priority={true}
                           alt={'user avatar'}
                    />
                </AspectRatio>
                <div className={'flex-center flex-col items-start'}>
                    <h3 className={'text-light-100 leading-tight text-20 lg:text-36 '}>
                        Welcome
                    </h3>
                    <Title tag={'h2'} className={'text-light-100 text-[40px] lg:text-[62px] leading-tight capitalize'}>
                        {user?.name}
                    </Title>
                </div>
            </div>

            <div className={'hidden lg:block'}>
                <IconSelect className={'text-[200px] text-white'} name={'logo-text'}/>
            </div>
            <div className={'block lg:hidden pb-10 opacity-20'}>
                <IconSelect className={'text-[150px] text-white'} name={'logo'}/>
            </div>
        </div>
    );
};