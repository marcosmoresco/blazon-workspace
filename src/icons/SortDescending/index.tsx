import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function SortDescendingIcon(props: IconProps) {
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
        d="M18 20.9992L23 25.9992L27.9999 21"
        stroke={color}
        strokeWidth={stroke}
      />
      <path d="M23 13.9992V25.9992" stroke={color} strokeWidth={stroke} />
      <path d="M6 15.9992H14.9999" stroke={color} strokeWidth={stroke} />
      <path d="M6 7.99921H22.9999" stroke={color} strokeWidth={stroke} />
      <path d="M6 23.9992H13" stroke={color} strokeWidth={stroke} />      
    </svg>
  );
}

SortDescendingIcon.defaultProps = {
  width: 32,
  height: 32,
  color: "black",
  stroke: 1,
};

export default SortDescendingIcon;
