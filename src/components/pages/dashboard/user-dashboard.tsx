'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import UpdateProfileForm from "@/components/pages/dashboard/update-profile-form";
import ChangePasswordForm from "@/components/pages/dashboard/change-password-form";
import {UserChats} from "@/components/pages/dashboard/user-chats";
import {ChatType, PaginatedResponse} from "@/types/index.js";
import React, {useEffect, useState} from "react";
import {Topics} from "@/components/pages/dashboard/topics";
import {useAuth} from "@/store/AuthProvider";
import {Loader2} from "lucide-react";

interface Props {
    chats: PaginatedResponse<ChatType>
}

export function UserDashboard({chats}: Props) {
    const {user, loading} = useAuth()
    const [userIn, setUserIn] = useState(false)

    useEffect(() => {
        if (user && user.name) {
            setUserIn(true)
        } else {
            setUserIn(false)
        }
    }, [loading]);

    if (!userIn || !user) {
        return <Loader2 className="w-6 h-6 mx-auto animate-spin text-white "/>;
    }

    return (
        <section className="max-w-1440 w-full bg-main-dark lg:min-h-[671px] rounded-20 overflow-hidden">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full flex gap-1 lg:gap-10 justify-start">
                    <TabsTrigger value="account">Last Repairs</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    {user?.role === 'admin' && <TabsTrigger value="topics">Topics</TabsTrigger>}
                </TabsList>
                <TabsContent className="w-full h-full" value="account">
                    <UserChats chats={chats} className="" user={user}/>
                </TabsContent>
                <TabsContent value="profile">
                    <UpdateProfileForm className="" initialData={user}/>
                </TabsContent>
                <TabsContent value="password">
                    <ChangePasswordForm
                        className="w-full mx-auto space-y-6 max-w-2xl bg-white p-5 rounded-20 shadow-lg mt-10"
                    />
                </TabsContent>
                <TabsContent value="topics">
                    <Topics/>
                </TabsContent>
            </Tabs>
        </section>
    );
}
