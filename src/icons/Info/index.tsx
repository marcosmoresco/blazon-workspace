import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function InfoIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0001 28C22.6275 28 28.0001 22.6274 28.0001 16C28.0001 9.37258 22.6275 4 16.0001 4C9.37264 4 4.00006 9.37258 4.00006 16C4.00006 22.6274 9.37264 28 16.0001 28Z"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M15 15H16V22H17" 
        stroke={color} 
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11.5C16.5523 11.5 17 11.0523 17 10.5C17 9.94772 16.5523 9.5 16 9.5C15.4477 9.5 15 9.94772 15 10.5C15 11.0523 15.4477 11.5 16 11.5Z"
        fill={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

InfoIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1};

export default InfoIcon;