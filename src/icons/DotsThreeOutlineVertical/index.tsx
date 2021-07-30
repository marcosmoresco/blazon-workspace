import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function DotsThreeIcon(props: IconProps) {
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
        d="M16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
        stroke={color}
      />
      <path
        d="M16 9C17.6569 9 19 7.65685 19 6C19 4.34315 17.6569 3 16 3C14.3431 3 13 4.34315 13 6C13 7.65685 14.3431 9 16 9Z"
        stroke={color}
      />
      <path
        d="M16 29C17.6569 29 19 27.6569 19 26C19 24.3431 17.6569 23 16 23C14.3431 23 13 24.3431 13 26C13 27.6569 14.3431 29 16 29Z"
        stroke={color}
      />
    </svg>
  );
}

DotsThreeIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default DotsThreeIcon;
