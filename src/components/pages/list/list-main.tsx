'use client'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Cookies from 'js-cookie'
import { Input } from '@/components/ui/input'
import { IconSelect } from '@/components/ui/icon-select'
import { Loader2 } from 'lucide-react'
import { PaginationControls } from '@/components/shared/pagination'
import { ListShow } from '@/components/pages/list/list-show'
import {ApiResponse, ChatType, PaginatedResponse} from "@/types/index.js";
import {cn} from "@/lib/utils";

interface Props {
    chats: PaginatedResponse<ChatType>
    className?: string
}

export const ListMain = ({ chats: initialPaginate, className }: Props) => {
    const [chats, setChats] = useState<ChatType[]>(initialPaginate.data)
    const [paginateData, setPaginateData] = useState(initialPaginate)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const token = Cookies.get('token')
    // Fetch on page change or initial load
    useEffect(() => {
        const fetchChats = async () => {

            try {
                const url = `/api/chat ? '/search' : ''}`
                const options: any = {
                    headers: { Authorization: `Bearer ${token}` },
                }
                if (query.length > 1) {
                    setLoading(true)
                    options.params = { query }
                    const resp = await axios.get<ApiResponse<ChatType[]>>(`/api/chats/search`, options)
                    setChats(resp.data.data)
                } else {
                    const resp = await axios.get<ApiResponse<PaginatedResponse<ChatType>>>(`/api/chat/?page=${page}`, options)
                    setChats(resp.data.data.data)
                    setPaginateData(resp.data.data)
                }
            } catch(e:any) {
                console.log(e)
                setChats([])
            } finally {
                setLoading(false)
            }
        }

        fetchChats()
    }, [page, query])

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => setQuery(query.trim()), 300)
        return () => clearTimeout(timer)
    }, [query])

    return (
        <section className={cn('flex flex-col gap-4 mt-4', className)}>
            <div className="relative w-full lg:w-1/3">
                <IconSelect
                    className="absolute top-3 right-3 z-10 text-2xl text-[#B9B9B9]"
                    name="search"
                />
                <Input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full h-full"
                    placeholder="Search chats..."
                />
            </div>

            {loading ? (
                <Loader2 className="w-10 h-10 mx-auto text-[#B9B9B9] animate-spin" />
            ) : (
                <ListShow chats={chats} />
            )}

            {!query && (
                <PaginationControls
                    currentPage={page}
                    lastPage={paginateData.last_page}
                    onPageChange={setPage}
                />
            )}
        </section>
    )
}
