'use client'

import {motion} from "framer-motion";
import React from "react";
import {IconSelect} from "@/components/ui/icon-select";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {format} from "date-fns";
import {useAuth} from "@/hooks/useAuth";
import {env} from "@/env";

interface ChatMessage {
    role: string;
    message: string;
    created_at?: string; // to hold message date
}

export const ChatBubble = ({msg}: { msg: ChatMessage }) => {
    const userRole = msg.role === "user";
    const {user} = useAuth()

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
        >
            <div className="flex items-center gap-3">
                {/* آیکون کاربر یا AI */}
                {!userRole && (
                    (
                        <div
                            className={'self-end bg-white rounded-full border border-gray-300 w-[40px] lg:w-[80px] h-[40px] lg:h-[80px] flex-center p-1'}>
                            <IconSelect name="chat-ai" className=" text-blue-600"/>
                        </div>
                    )
                )}
                {/* باکس پیام */}
                <div
                    className={`max-w-xs p-3 rounded-12 border border-gray-200 text-14 font-medium lg:text-16 text-gray-700 ${userRole ? "bg-[#EDEDFF] " : "bg-white"}`}
                >
                    <p>{msg.message}</p>
                    <div className={" mt-1 font-normal text-xs"}>
                        {msg.created_at && (format(new Date(msg.created_at), 'yyyy-MM-dd HH:mm'))}
                    </div>
                </div>
                {msg.role === 'user' && (
                    <AspectRatio
                        className={'self-end bg-white rounded-full border border-gray-300 w-[40px] lg:w-[80px] h-[40px] lg:h-[80px] flex-center p-5'}
                        ratio={1}>
                        <Image src={user?.avatar ? env.NEXT_PUBLIC_IMAGE_DIRECTORY + user.avatar : '/assets/user-avatar.svg'}
                               className={'static w-full h-full object-contain pt-2'}
                               fill={true} sizes={'50svw'} priority={true}
                               alt={'user avatar'}
                        />
                    </AspectRatio>
                )}
            </div>
        </motion.div>
    );
};