import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function XCircleIcon(props: IconProps) {
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
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke={color}
      />
      <path d="M20 12L12 20" stroke={color} />
      <path d="M20 20L12 12" stroke={color} />
    </svg>
  );
}

XCircleIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default XCircleIcon;
