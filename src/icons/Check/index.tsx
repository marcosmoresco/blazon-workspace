import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function CheckIcon(props: IconProps) {
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
        d="M27 9.00098L13 23.0004L6 16.001"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

CheckIcon.defaultProps = { width: 32, height: 32, color: "#000000" };

export default CheckIcon;
