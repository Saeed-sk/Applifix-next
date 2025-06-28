import Chat from "@/components/pages/chat/chat-box";
import {IconSelect} from "@/components/ui/icon-select";
import {getUserSingleChat} from "@/api/get-user-single-chat";
import {ChatMessage} from "@/types/index.js";
import {cookies} from "next/headers";
import type {Metadata} from "next";
import {postChatTopic} from "@/api/post-chat-topic";

export const metadata: Metadata = {
    title: {
        default: "Applifix - Chat with AI",
        template: "%s | Chat",
    },
    description: "Chat with AI in Applifix",
};

type PropsType = {
    searchParams: Promise<
        {
            topic?: string,
            chat_id?: string
        }
    >
}
export default async function ChatMain({searchParams}: PropsType) {
    const cookie = await cookies()
    const params = await searchParams
    let chats: ChatMessage[] = [];
    if (cookie.has('token') && params?.chat_id) chats = await getUserSingleChat(parseInt(params.chat_id))
    if (params?.topic) chats = await postChatTopic(parseInt(params.topic))
    return (
        <main className={'w-full h-full bg-main-dark pt-10 lg:pr-10'}>
            <div className={'flex-center'}>
                <h1 className="text-24 lg:text-40 font-medium mb-4 text-center text-gray-800 flex-center font-condensed leading-10 bg-light-100 px-4 py-2 rounded-12 text-box-shadow">
                    <IconSelect className={'text-4xl mr-2'} name={'chat-top'}/>
                    <strong className={'font-medium p-1 rounded-5 h-full bg-[#E7E5FF] text-warning-100'}>
                        AI
                    </strong>
                    Assistant
                </h1>
            </div>
            <Chat chats={chats}/>
        </main>
    )
}

