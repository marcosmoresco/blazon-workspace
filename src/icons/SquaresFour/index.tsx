import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function SquaresFourIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 6H6V14H14V6Z" stroke={color} />
      <path d="M26 6H18V14H26V6Z" stroke={color} />
      <path d="M14 18H6V26H14V18Z" stroke={color} />
      <path d="M26 18H18V26H26V18Z" stroke={color} />
    </svg>
  );
}

SquaresFourIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default SquaresFourIcon;
