import axios from "@/lib/axios";
import {PaginatedResponse, TopicApiResponse, TopicType} from "@/types/index.js";


export async function getUserChat(page: number = 1): Promise<PaginatedResponse<TopicType>> {
    try {
        const response = await axios.get<TopicApiResponse>(`/api/chat?page=${page}`);
        return response.data.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch user Chats");
    }
}
