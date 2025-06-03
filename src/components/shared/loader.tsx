import React from 'react';


export const Loader = ({size = 50}) => {
    return (
        <div
            className="loader"
            style={{width: size, height: size}}
        ></div>
    );
};

