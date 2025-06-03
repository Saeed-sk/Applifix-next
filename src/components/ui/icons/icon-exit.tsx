import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
}

export const IconExit: React.FC<Props> = ({className, ...props}) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.75 5.001H6.25v17.5a2.5 2.5 0 0 0 2.5 2.5h10m1.25-6.25 3.75-3.75m0 0L20 11.251m3.75 3.75h-12.5"
            />
        </svg>
    );
};
