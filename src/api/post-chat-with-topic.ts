import axios from "@/lib/axios";
import {ApiResponse, ChatMessage, PaginatedResponse, TopicType} from "@/types/index.js";


export async function getChatWithTopic(topic_id: number): Promise<ChatMessage[]> {
    try {
        const response = await axios.get <ApiResponse<ChatMessage[]>>(`/api/topics?page=${page}`);
        return response.data.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch topics");
    }
}
