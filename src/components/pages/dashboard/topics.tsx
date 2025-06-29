import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {PaginatedResponse, TopicType} from "@/types/index.js";
import {getTopics} from "@/api/get-topics";
import {Loader2, Trash2} from "lucide-react";
import {textTrim} from "@/helpers/text-trim";
import {Button} from "@/components/ui/button";
import TopicModalForm from "@/components/pages/dashboard/topics-create";
import {PaginationControls} from "@/components/shared/pagination";
import Image from "next/image";
import {env} from "@/env";
import Cookies from "js-cookie";
import axios from "@/lib/axios";


export function Topics() {
    const [page, setPage] = useState(1)
    const [topics, setTopics] = useState<PaginatedResponse<TopicType> | null>(null)
    const [loading, setLoading] = useState(false)
    const [change, setChange] = useState(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        let isMounted = true
        setLoading(true)
        setError(null)

        getTopics(page)
            .then(data => {
                if (!isMounted) return
                setTopics(data)
            })
            .catch(err => {
                if (!isMounted) return
                setError(err.message || 'Failed to fetch topics')
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [page, change])

    if (loading) {
        return (
            <div className={'w-full flex-center mt-10'}>
                <Loader2 className={'animate-spin'}/>
            </div>
        )
    }

    function dlTopic(id: number) {
        const token = Cookies.get('token')
        axios.delete(`/api/topics?id=${id}`).then(() => handleSuccess()).catch(e=>console.log(e))
    }

    function handleSuccess() {
        setPage(1)
        setChange(!change)
    }


    return (
        <Table className={'px-20'}>
            <TableHeader>
                <TableRow className={'bg-gray-500 text-white'}>
                    <TableHead className="w-[100px] ">Id</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Edit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {topics?.data.map((topic) => (
                    <TableRow key={topic.id}>
                        <TableCell>{topic.id}</TableCell>
                        <TableCell className="font-medium">{textTrim(topic.description, 5)}...</TableCell>
                        <TableCell><img src={env.NEXT_PUBLIC_IMAGE_DIRECTORY + topic.src} width={100} height={50}
                                          alt={''}/></TableCell>
                        <TableCell>
                            <TopicModalForm
                                topicId={topic.id}
                                initial={{
                                    id: topic.id,
                                    title: topic.title,
                                    description: topic.description,
                                    src: topic.src,
                                }}
                                onSuccessAction={handleSuccess}/>
                            <Button onClick={() => dlTopic(topic.id)} variant={'destructive'} size={'icon'}
                                    className={''}>
                                <Trash2/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableCaption>
                {topics?.last_page && topics?.current_page && (
                    <PaginationControls
                        currentPage={topics.current_page}
                        lastPage={topics.last_page}
                        onPageChange={(pgc) => setPage(pgc)}
                    />
                )}
                <div className={'mt-2'}>
                    <TopicModalForm onSuccessAction={handleSuccess}/>
                </div>
            </TableCaption>

        </Table>
    )
}
