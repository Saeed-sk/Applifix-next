import * as React from 'react';
import type {UserType} from "@/types/auth";
import {cn} from "@/lib/utils";
import {ChatType, PaginatedResponse} from "@/types/index.js";
import Link from "next/link";
import {format} from "date-fns";
import {textTrim} from "@/helpers/text-trim";

type Props = {
    className?: string
    chats: ChatType[]
};


export function ListShow({className, chats}: Props) {
    return (
        <div
            className={cn('w-full h-full mt-2 lg:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3', className)}>
            {!chats?.length && (
                <p className={'text-red-600 text-center w-full lg:text-left'}>No Repair records found.</p>)}
            {chats?.map((chat: ChatType,index) => (
                <Link key={chat.id} href={`/chat?chat_id=${chat.id}`}>
                    <div
                        className={'bg-light-100 px-5 py-3 gap-2 flex-center items-start w-full rounded-20 font-bold border border-gray-200 h-[84px] lg:w-full justify-start'}>
                        <div className={'flex-center flex-col items-start w-full'}>
                            <h2 className={'text-20 font-condensed'}>
                                {textTrim(chat.title, 5)}
                            </h2>
                            <div className={' flex-center justify-between w-full'}>
                                <p className={'text-14 text-gray-600 '}>
                                    {textTrim(chat.history[0].message, 10)}
                                </p>
                                <p className={'text-12 text-gray-600 font-regular'}>
                                    {format(new Date(chat.created_at), 'yyyy-MM-dd HH:mm')}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
