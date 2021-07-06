import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function XIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M25 7L7 25" 
        stroke={color} 
      />
      <path 
        d="M25 25L7 7" 
        stroke={color} 
      />
    </svg>
  );
}

XIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default XIcon;