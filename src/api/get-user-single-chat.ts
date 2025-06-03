// services/chat.ts
import axios from "@/lib/axios";
import {ApiResponse, ChatMessage} from "@/types/index.js";
import {cookies} from "next/headers";

export async function getUserSingleChat(chat_id: number): Promise<ChatMessage[]> {
    if (typeof chat_id !== "number") {
        throw new Error("chat_id must be a number");
    }

    const cookie = await cookies()
    const token = cookie.get('token')?.value

    try {
        const response = await axios.get<ApiResponse<ChatMessage[]>>(`/api/chat/${chat_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error: any) {
        const msg = error?.response?.data?.message || "Failed to fetch user chat";
        throw new Error(msg);
    }
}