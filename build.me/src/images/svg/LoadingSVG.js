import React from 'react'

const LoadingSVG = () => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: "auto", background: "none" }}
        display="block"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
        className="w-12 h-10"
    >
        <g>
        <path
            fill="none"
            stroke="#1d0b0b"
            strokeWidth="5"
            d="M50 30a20 20 0 1019.88 17.805"
        ></path>
        <path fill="#1d0b0b" d="M49 30"></path>
        <animateTransform
            attributeName="transform"
            dur="0.7936507936507936s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;360 50 50"
        ></animateTransform>
        </g>
    </svg>
    );
}

export default LoadingSVG
