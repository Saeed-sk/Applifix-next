// components/pages/hotel/single/HotelSingleMapClient.tsx
'use client';

import dynamic from 'next/dynamic';
import {ChatType, PaginatedResponse} from "@/types/index.js";

interface Props {
    chats: PaginatedResponse<ChatType>;
}


const UserDashboard = dynamic(
    () =>
        import('@/components/pages/dashboard/user-dashboard')
            .then((mod) => mod.UserDashboard),
    {ssr: false}
);

export default function HotelSingleMapClient({chats}: Props) {
    return <UserDashboard chats={chats}/>;
}
