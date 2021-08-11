import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function DotsThreeVerticalIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width={width} height={height} fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="12" cy="4" r="2" fill={color} />
        <circle cx="12" cy="20" r="2" fill={color} />
        <circle cx="12" cy="12" r="2" fill={color} />
      </g>
    </svg>
  );
}

DotsThreeVerticalIcon.defaultProps = {
  width: 24,
  height: 24,
  color: "black",
  stroke: 1,
};

export default DotsThreeVerticalIcon;
