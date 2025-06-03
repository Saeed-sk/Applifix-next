// components/CustomIcon.tsx

import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
}

export const LogoIconTextNone: React.FC<Props> = ({className, ...props}) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 34 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <g clipPath="url(#clip0_46_1836)">
                <path
                    d="M19.5386 0.989547C23.8316 5.42821 28.056 9.91802 32.3469 14.3725C32.5082 14.5404 33.675 15.634 33.6571 15.7414L29.3662 20.2045L18.599 8.96487L18.4473 9.0189L12.5036 15.2075L12.4556 15.3401L18.9154 22.0453L23.0821 17.7759L27.3772 22.2398L18.9634 30.9997L8.15365 19.7744L4.29371 23.7714L0 19.2679L18.4761 0.0212698C18.5152 -0.0147524 18.5386 -0.000343554 18.5784 0.0212698C18.6552 0.0630556 19.4013 0.846899 19.5386 0.988827V0.989547Z"
                    fill="#FABD03"
                />
            </g>
            <defs>
                <clipPath id="clip0_46_1836">
                    <rect width="33.6571" height="31" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
};

