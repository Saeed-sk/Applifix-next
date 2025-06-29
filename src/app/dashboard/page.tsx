import {getUserChats} from "@/api/get-user-chats";
import {UserDashboard} from "@/components/pages/dashboard/user-dashboard";

export default async function DashboardPage() {
    const chats = await getUserChats(1)
    return <UserDashboard chats={chats}/>
}