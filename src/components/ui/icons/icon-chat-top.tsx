import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export const IconChat: React.FC<Props> = ({ className, ...props }) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                stroke="currentColor"
                strokeWidth={2}
                d="M1.2 14a12.8 12.8 0 0 1 25.6 0v8.144c0 1.357 0 2.032-.201 2.575a3.2 3.2 0 0 1-1.88 1.88c-.543.201-1.22.201-2.575.201H14A12.8 12.8 0 0 1 1.2 14Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.2 12.4h9.6M14 18.8h4.8"
            />
        </svg>
    );
};
