import axios from "@/lib/axios";
import {ApiResponse, ChatType, PaginatedResponse} from "@/types/index.js";
import {cookies} from "next/headers";


export async function getUserChats(page: number = 1): Promise<PaginatedResponse<ChatType>> {
    const cookie = await cookies()
    const token = cookie.get('token')?.value
    try {
        const response = await axios.get<ApiResponse<PaginatedResponse<ChatType>>>(`/api/chat?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch user Chats");
    }
}
