import {ApiResponse, ChatMessage} from "@/types/index.js";
import axios from "@/lib/axios";

export async function postChatTopic(topic_id: number): Promise<ChatMessage[]> {
    try {
        const response = await axios.post <ApiResponse<ChatMessage[]>>(`/api/new/chat`, {
            topic_id: topic_id,
        });
        return response.data.data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error?.response?.data?.message || "Failed to create chat with topic");
    }
}