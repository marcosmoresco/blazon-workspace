import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function ArrowRightIcon(props: IconProps) {
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
        d="M5 16H27"
        stroke={color}   
        strokeWidth={stroke}    
      />
      <path
        d="M18 7L27 16L18 25"
        stroke={color}  
        strokeWidth={stroke}     
      />
    </svg>
  );
}

ArrowRightIcon.defaultProps = { width: 32, height: 32, color: "#000000", stroke: 1 };

export default ArrowRightIcon;
