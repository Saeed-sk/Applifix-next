import {getUserChats} from "@/api/get-user-chats";
import {cookies} from "next/headers";
import HotelSingleMapClient from "@/components/pages/dashboard/UserDashboardShell";

export default async function DashboardPage() {
    const cookie = await cookies()
    if (!cookie.has('token')) {
        return null
    }
    const chats = await getUserChats()
    return <HotelSingleMapClient chats={chats}/>
}