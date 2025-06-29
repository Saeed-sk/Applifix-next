import axios from "@/lib/axios";
import {ApiResponse, PaginatedResponse, TopicType} from "@/types/index.js";


export async function getTopics(page: number = 1): Promise<PaginatedResponse<TopicType>> {
    try {
        const response = await axios.get<ApiResponse<PaginatedResponse<TopicType>>>(`/api/topics`,{
            headers: {
                'Pragma': 'no-cache',
                'Expires': '0'
            },
        });
        return response.data.data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error?.response?.data?.message || "Failed to fetch topics");
    }
}
