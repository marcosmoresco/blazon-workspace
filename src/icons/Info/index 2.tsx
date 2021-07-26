import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function InfoIcon(props: IconProps) {
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
        d="M24.0001 42C33.9412 42 42.0001 33.9411 42.0001 24C42.0001 14.0589 33.9412 6 24.0001 6C14.059 6 6.00009 14.0589 6.00009 24C6.00009 33.9411 14.059 42 24.0001 42Z"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.5 22.5H24V33H25.5"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24 17.25C24.8284 17.25 25.5 16.5784 25.5 15.75C25.5 14.9216 24.8284 14.25 24 14.25C23.1716 14.25 22.5 14.9216 22.5 15.75C22.5 16.5784 23.1716 17.25 24 17.25Z"
        fill={color}
      />
    </svg>
  );
}

InfoIcon.defaultProps = { width: 48, height: 48, color: "#BDBCC5" };

export default InfoIcon;
