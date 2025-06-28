'use client';
import {TopicType} from "@/types/index.js";
import Link from "next/link";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {textTrim} from "@/helpers/text-trim";
import {env} from "@/env";
import {motion} from "motion/react"

type Props = {
    data: TopicType
    index?: number
};

export function CardTopic({data, index = 0, ...props}: Props) {
    const enterActionDelay = (index * 0.3) + 0.1;
    return (
        <Link href={`/chat?topic=${data.id}`}>
            <motion.div
                initial={{opacity: 0, translateX: 20}}
                animate={{opacity: 1, translateX: 0}}
                transition={{duration: 0.5, delay: Number(enterActionDelay)}}
                className={'bg-[#F0FFF5] group hover:drop-shadow-lg hover:!-translate-y-2 px-5 py-3 hover:transition-all gap-2 flex-center items-start w-full h-[100px] rounded-20 font-bold border border-gray-200 min-h-[85px] lg:w-full justify-start'}>
                <AspectRatio className={'h-full !w-24 relative'}>
                    <Image className={'static !w-full h-full object-contain text-12 border border-gray-200 rounded-lg'}
                           src={env.NEXT_PUBLIC_IMAGE_DIRECTORY + data.src}
                           alt={data.title}
                           width={100}
                           loading={'lazy'}
                           height={100}/>
                </AspectRatio>
                <div className={'flex-center flex-col items-start'}>
                    <h2 className={'text-16 lg:text-20 font-condensed'}>
                        {textTrim(data.title, 5)}
                    </h2>
                    <p className={'text-12 text-gray-600 font-'}>
                        {textTrim(data.title, 10)}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};