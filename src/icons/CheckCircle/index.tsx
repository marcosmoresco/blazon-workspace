import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function CheckCircleIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.25 19.5L21.2499 30L15.75 24.75"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42Z"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

CheckCircleIcon.defaultProps = { width: 48, height: 48, color: "#BDBCC5" };

export default CheckCircleIcon;
