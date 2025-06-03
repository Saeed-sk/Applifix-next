import axios from "@/lib/axios";
import {ApiResponse, ChatMessage} from "@/types/index.js";


export async function postChatWithTopic(topic_id: number): Promise<ChatMessage[]> {
    try {
        const response = await axios.post <ApiResponse<ChatMessage[]>>(`/api/chat/topic`, {
            topic_id
        });
        return response.data.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch topics");
    }
}
