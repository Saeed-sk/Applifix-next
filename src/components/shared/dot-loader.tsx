import {cn} from "@/lib/utils";

export const DotLoader = ({className}: { className?: string }) => {
    return (
        <div className={cn('dot-loader', className)}/>
    )
}