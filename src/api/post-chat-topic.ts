import {ApiResponse, ChatMessage} from "@/types/index.js";
import axios from "@/lib/axios";

export async function postChatTopic(topic_id: number): Promise<ChatMessage[]> {
    try {
        const response = await axios.post<ApiResponse<ChatMessage[]>>(
            `/api/new/chat/topic`,
            {
                topic_id: topic_id
            },
            {
                headers: {
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }
        );
        return response.data.data;
    } catch (error: any) {
        if (error?.response?.status === 429) {
            throw new Error("LIMIT_REACHED");
        }
        console.log(error)
        throw new Error(error?.response?.data?.message || "Failed to create chat with topic");
    }
}