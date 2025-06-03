import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export const IconList: React.FC<Props> = ({ className, ...props }) => {
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.625 8H18.5m0 5.5h-6.875M18.5 19h-6.875M4.75 24.5h16.5A2.75 2.75 0 0 0 24 21.75V5.25a2.75 2.75 0 0 0-2.75-2.75H4.75A2.75 2.75 0 0 0 2 5.25v16.5a2.75 2.75 0 0 0 2.75 2.75Z"
            />
        </svg>
    );
};
