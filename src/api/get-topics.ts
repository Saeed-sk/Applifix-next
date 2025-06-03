import axios from "@/lib/axios";

export async function getTopic(id: number) {
    try {
        const response = await axios.get(`/api/topic/${id}`);
        return response.data;
    }catch (e){
        throw e
    }
}