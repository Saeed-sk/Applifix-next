'use client'
import * as React from 'react';
import {useAuth} from "@/hooks/useAuth";
import {Title} from "@/components/shared/title";
import Link from "next/link";

type Props = {};

export function HomeSignCard(props: Props) {
    const {user, loading} = useAuth()
    if (user) {
        return null
    } else {
        return (
            <div className={'neo-morphism px-8 py-5 rounded-20 flex-center flex-col items-center gap-4'}>
                <Title tag={'h3'} className={'text-20 lg:text-36'}>
                    Sign up to unlock more features!
                </Title>
                <p className={'text-14 lg:text-20 flex-center flex-col items-start w-full text-gray-600 font-medium'}>
                    <span>Personalized experience.</span>
                    <span>Activity tracking and history.</span>
                    <span>Special offers and updates.</span>
                </p>
                <p className={'text-12 lg:text-20 font-normal w-full text-start font-condensed'}>
                    <Link className={'text-12 lg:text-20 font-inherit text-blue-700 underline'} href={'/register'}>Join
                        now</Link> and get the most out of your experience!
                </p>
            </div>
        )
    }
}