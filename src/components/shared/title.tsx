import React, {JSX} from "react";
import {cn} from "@/lib/utils";

type Props = {
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    children: React.ReactNode;
};

export function Title({tag: Tag = 'h1', className, children}: Props) {
    return (
        <Tag className={cn('font-condensed text-20 lg:text-36 font-medium text-primary-900', className)}>
            {children}
        </Tag>
    );
}
