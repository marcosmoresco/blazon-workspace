import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function PlusSimpleIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 16H27" stroke={color} strokeWidth={stroke}/>
      <path d="M16 5V27" stroke={color} strokeWidth={stroke}/>      
    </svg>
  );
}

PlusSimpleIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default PlusSimpleIcon;