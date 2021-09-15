import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function ArrowsOutSimpleIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 6H26V12" stroke={color} strokeWidth={stroke} />
      <path d="M19 13L26 6" stroke={color} strokeWidth={stroke} />
      <path d="M12 26H6V20" stroke={color} strokeWidth={stroke} />
      <path d="M13 19L6 26" stroke={color} strokeWidth={stroke} />
    </svg>
  );
}

ArrowsOutSimpleIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default ArrowsOutSimpleIcon;
