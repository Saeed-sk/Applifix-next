"use client"

import * as React from 'react'
import {cn} from "@/lib/utils";

export interface StandardImageWrapperProps {
    /** Aspect ratio (width / height), default is 16/9 */
    ratio?: number
    /** Additional CSS classes */
    className?: string
    /** Image or any children elements */
    children: React.ReactNode
}

/**
 * StandardImageWrapper provides a simple div wrapper
 * that enforces an aspect ratio, allowing you to pass
 * a Next.js <Image> (or any element) as children.
 */
export function AspectRatio({
                                         ratio = 16 / 9,
                                         className,
                                         children,
                                     }: StandardImageWrapperProps) {
    return (
        <figure
            className={cn('relative w-full h-auto overflow-hidden', className)}
            style={{
                aspectRatio: ratio,
            }}
        >
            {children}
        </figure>
    )
}
