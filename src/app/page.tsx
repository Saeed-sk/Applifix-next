import {getTopics} from "@/api/get-topics";
import {IconSelect} from "@/components/ui/icon-select";
import Link from "next/link";
import {TopicType} from "@/types/index.js";
import {Title} from "@/components/shared/title";
import {CardTopic} from "@/components/ui/cards/card-topic";
import {HomeSignCard} from "@/components/ui/cards/home-sign-card";
import {FallingText} from "@/components/shared/falling-text";
import {ParticleBackground} from "@/components/shared/particles";

export default async function Home() {
    const topics = await getTopics();
    return (
        <main
            className={'max-w-1440 w-full h-full main-background-container relative bg-main-dark z-0 text-black text-48 flex-center flex-col items-start gap-5 lg:pl-36 pt-10 px-5 lg:px-0'}>
            <ParticleBackground
                className={'opacity-40'}
                particleColor={'#6B2C73'}
                linkColor={'#6B2C73'}
                particleCount={100}
                speed={2}
            />
            <Link className={'lg:w-1/2 animate__animated animate__fadeIn '} href={'/chat'}>
                <div
                    className={'neo-morphism bg-main-dark hover:bg-primary-500 hover:text-gray-100 group transition-colors p-5 lg:p-10 flex-center w-full rounded-20 font-medium justify-between font-condensed'}>
                    <FallingText className={'text-24 lg:text-40 max-w-[400px]'} text={'Do you have anything to fix?'}/>
                    <IconSelect className={'text-48 group-hover:scale-125 transition-transform'} name={'ai'}/>
                </div>
            </Link>
            <section className={' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full '}>
                <Title tag={'h2'} className={'col-span-full text-20 lg:text-36'}>
                    Quick Access
                </Title>
                {topics.data.map((topic: TopicType, index) => index < 7 && (
                    <CardTopic key={index} data={topic} index={index + 1}/>
                ))}
            </section>
            <HomeSignCard/>
        </main>
    )
}