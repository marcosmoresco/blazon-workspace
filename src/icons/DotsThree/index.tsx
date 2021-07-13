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
        d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
        fill={color}
      />
      <path
        d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z"
        fill={color}
      />
      <path
        d="M24 17C24.5523 17 25 16.5523 25 16C25 15.4477 24.5523 15 24 15C23.4477 15 23 15.4477 23 16C23 16.5523 23.4477 17 24 17Z"
        fill={color}
      />{" "}
    </svg>
  );
}

DotsThreeIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default DotsThreeIcon;
