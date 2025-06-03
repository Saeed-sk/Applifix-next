import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

export const IconHome: React.FC<Props> = ({ className, ...props }) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 25 26"
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
                d="M16.333 24.375V14.112c0-.34-.138-.667-.383-.908a1.323 1.323 0 0 0-.926-.375H9.788c-.347 0-.68.135-.926.375a1.27 1.27 0 0 0-.383.908v10.263"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1.438 11.204c0-.349.077-.693.226-1.009a2.4 2.4 0 0 1 .638-.821l8.53-7.183c.44-.366.998-.566 1.574-.566.576 0 1.134.2 1.574.566l8.53 7.183a2.36 2.36 0 0 1 .864 1.83V21.98c.001.635-.256 1.244-.713 1.694a2.46 2.46 0 0 1-1.724.701H3.875a2.46 2.46 0 0 1-1.724-.701 2.374 2.374 0 0 1-.713-1.694V11.204Z"
            />
        </svg>

    );
};
