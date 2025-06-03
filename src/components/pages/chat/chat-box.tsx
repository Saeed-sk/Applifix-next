'use client'
import {useState, useEffect, KeyboardEvent, useRef} from "react";
import {ChatBubble} from "@/components/pages/chat/chat-bubble";
import axios from "@/lib/axios";
import ScrollContainer from "react-indiana-drag-scroll";
import {IconSelect} from "@/components/ui/icon-select";
import {useRouter, useSearchParams} from "next/navigation";
import {ChatMessage} from "@/types/index.js";
import {AxiosError} from "axios";
import {any} from "zod";
import {LimitModal} from "@/components/pages/chat/limit-modal";


interface Props {
    chats: ChatMessage[]
}

export default function Chat({chats}: Props) {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<ChatMessage[]>(chats);
    const [loading, setLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [chatId, setChatId] = useState<null | number>(null)
    const [topicId, setTopicId] = useState<null | number>(null)
    const [modal, setModal] = useState<boolean>(false)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chat]);
    const router = useRouter()
    const searchParams = useSearchParams()
    const sendMessage = async () => {
        if (!message.trim()) return;
        const userMsg = {role: "user", message: message, created_at: new Date().toISOString()};
        setChat(prev => [...prev, userMsg]);
        setMessage("");
        setLoading(true);
        try {
            const {data} = await axios.post<{ data: { ai_message: string, chat_id?: number } }>("/api/chat", {
                message,
                chat_id: chatId,
                topic_id: topicId
            });
            if (!chatId && data.data?.chat_id) {
                const params = new URLSearchParams(searchParams)
                params.set('chat_id', String(data.data.chat_id))
                router.push(`?${params.toString()}`)
                setChatId(data.data.chat_id)
            }
            const botMsg = {role: "assistant", message: data.data.ai_message, created_at: new Date().toISOString()};
            setChat(prev => [...prev, botMsg]);
        } catch (e: any) {
            if (e?.status === 429) {
                setModal(true);
                return;
            }
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const onKey = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage();

    return (
        <section className="flex flex-col w-full h-[70svh] lg:h-[75svh] lg:rounded-2xl overflow-hidden chat-box-shadow">
            {/* Chat messages */}
            <ScrollContainer
                hideScrollbars={false}
                className="flex-grow p-5 overflow-y-auto scrollbar scrollbar-thumb-primary-100 scrollbar-track-gray-50 pb-20"
            >
                {chat.length === 0 ? (
                    <p className="text-center text-gray-400">No messages yet. Start the conversation!</p>
                ) : (
                    chat.map((msg, i) => <ChatBubble msg={msg} key={i}/>)
                )}
                <div ref={messagesEndRef}/>
            </ScrollContainer>

            {/* Input bar */}
            <div className="sticky bottom-0 bg-white  flex items-center gap-2 border-t">
                <input
                    type="text"
                    className="flex-grow border rounded-l-md px-4 py-5 !rounded-none focus:outline-none focus:ring-0 focus:ring-primary-500"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={onKey}
                    placeholder="Ask the AI Assistant..."
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="absolute right-5 text-blue-500 hover:text-blue-600 disabled:opacity-50 transition"
                >
                    <IconSelect name="send" className="w-12 h-12"/>
                </button>
            </div>
            <LimitModal open={modal}/>
        </section>
    );
}
