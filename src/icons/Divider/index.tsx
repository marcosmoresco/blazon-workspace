import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function DividerIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 2 16`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} rx="1" fill={color}/>     
    </svg>
  );
}

DividerIcon.defaultProps = {
  width: 2,
  height: 16,
  color: "#E9E8EB" 
};

export default DividerIcon;
