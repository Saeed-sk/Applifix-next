import {getTopics} from "@/api/get-topics";

export default async function List() {
    const topics = await getTopics();
    return (
        <div>
            get topic
        </div>
    )
}