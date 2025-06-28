import React from "react";
import {cn} from "@/lib/utils";

interface Props {
    text: string;
    className?: string;
}

export const FallingText = ({text, className}: Props) => {
    return (
        <h2 className={cn('falling-container inline-block overflow-hidden ', className)}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className={`falling-letter ${char === " " ? "falling-space" : ""}`}
                    style={{animationDelay: `${index * 0.06}s`}}
                >
          {char === " " ? "\u00A0" : char}
        </span>
            ))}
        </h2>
    );
};
