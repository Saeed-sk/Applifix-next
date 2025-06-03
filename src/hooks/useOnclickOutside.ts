// hooks/useOnClickOutside.ts
'use client';

import { useEffect, useRef, RefObject } from 'react';

type EventType = MouseEvent | TouchEvent;

export default function useOnClickOutside<T extends HTMLElement>(
    handler: (event: EventType) => void
): RefObject<T> {
    const ref = useRef<T>(null!);

    useEffect(() => {
        const listener = (event: EventType) => {
            const el = ref.current;
            if (!el || el.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener, { passive: true });
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            }
        };
    }, [handler]);

    return ref;
}
