import {Title} from "@/components/shared/title";
import {getUserChats} from "@/api/get-user-chats";
import {ListMain} from "@/components/pages/list/list-main";

export default async function List() {
    const chats = await getUserChats(1)
    return (
        <main className={'w-full h-full bg-main-dark pt-10 lg:pr-10 p-5 lg:pl-24'}>
            <Title>
                Repair History
            </Title>
            <ListMain chats={chats}/>
        </main>
    )
}