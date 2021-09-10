import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function DotsThreeIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 18 18`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 9.5625C9.31066 9.5625 9.5625 9.31066 9.5625 9C9.5625 8.68934 9.31066 8.4375 9 8.4375C8.68934 8.4375 8.4375 8.68934 8.4375 9C8.4375 9.31066 8.68934 9.5625 9 9.5625Z"
        fill={color}
        stroke={color}
        strokeWidth={stroke}
      />
      <path
        d="M4.5 9.5625C4.81066 9.5625 5.0625 9.31066 5.0625 9C5.0625 8.68934 4.81066 8.4375 4.5 8.4375C4.18934 8.4375 3.9375 8.68934 3.9375 9C3.9375 9.31066 4.18934 9.5625 4.5 9.5625Z"
        fill={color}
        stroke={color}
        strokeWidth={stroke}
      />
      <path
        d="M13.5 9.5625C13.8107 9.5625 14.0625 9.31066 14.0625 9C14.0625 8.68934 13.8107 8.4375 13.5 8.4375C13.1893 8.4375 12.9375 8.68934 12.9375 9C12.9375 9.31066 13.1893 9.5625 13.5 9.5625Z"
        fill={color}
        stroke={color}
        strokeWidth={stroke}
      />
    </svg>
  );
}

DotsThreeIcon.defaultProps = {
  width: 18,
  height: 18,
  color: "black",
  stroke: 1,
};

export default DotsThreeIcon;
