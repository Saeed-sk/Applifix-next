import {getTopics} from "@/api/get-topics";
import {IconSelect} from "@/components/ui/icon-select";
import Link from "next/link";
import {TopicType} from "@/types/index.js";
import {Title} from "@/components/shared/title";
import {CardTopic} from "@/components/ui/cards/card-topic";
import {HomeSignCard} from "@/components/ui/cards/home-sign-card";

export default async function Home() {
    const topics = await getTopics();
    return (
        <main
            className={'max-w-1440 w-full h-full text-black text-48 flex-center flex-col items-start gap-5 lg:pl-36 pt-10 px-5 lg:px-0'}>

            <Link className={'lg:w-1/2'} href={'/chat'}>
                <div
                    className={'neo-morphism bg-main-dark p-10 flex-center w-full rounded-20 font-medium justify-between font-condensed'}>
                    <h2 className={'text-[40px] max-w-[400px]'}>
                        Do you have anything
                        to fix?
                    </h2>
                    <IconSelect className={'text-48'} name={'ai'}/>
                </div>
            </Link>
            <section className={' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'}>
                <Title tag={'h2'} className={'col-span-full'}>
                    Quick Access
                </Title>
                {topics.data.map((topic: TopicType, index) => index < 7 && (
                    <CardTopic key={index} data={topic}/>
                ))}
            </section>

            <HomeSignCard/>
        </main>
    )
}