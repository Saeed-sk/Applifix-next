import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export const IconSend: React.FC<Props> = ({ className, ...props }) => {
    return (
        <svg
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 60 61"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                fill="currentColor"
                d="M0 30.5C0 13.931 13.431.5 30 .5c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30Z"
            />
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M35.967 30.5H22.596a3.32 3.32 0 0 0-.287-1.346L18.3 20.192c-1.282-2.866 1.784-5.736 4.611-4.318L46.153 27.53c2.463 1.233 2.463 4.71 0 5.942l-23.24 11.655c-2.829 1.418-5.895-1.453-4.613-4.318l4.006-8.962c.189-.424.287-.882.286-1.346"
            />
        </svg>
    );
};
