import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function HardDriveIcon(props: IconProps) {
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
        d="M28 9H4C3.44772 9 3 9.44772 3 10V22C3 22.5523 3.44772 23 4 23H28C28.5523 23 29 22.5523 29 22V10C29 9.44772 28.5523 9 28 9Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.5 17C24.0523 17 24.5 16.5523 24.5 16C24.5 15.4477 24.0523 15 23.5 15C22.9477 15 22.5 15.4477 22.5 16C22.5 16.5523 22.9477 17 23.5 17Z"
        fill={color}
      />
    </svg>
  );
}

HardDriveIcon.defaultProps = { width: 32, height: 32, color: "#000000" };

export default HardDriveIcon;
