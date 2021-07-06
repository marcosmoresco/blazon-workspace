import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function ArrowClockwiseIcon(props: IconProps) {
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
        d="M20.25 12H3.75"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5 5.25L3.75 12L10.5 18.75"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

ArrowClockwiseIcon.defaultProps = { width: 24, height: 24, color: "#1B202A" };

export default ArrowClockwiseIcon;
