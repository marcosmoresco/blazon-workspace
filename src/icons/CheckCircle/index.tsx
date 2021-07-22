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
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.5 13L14.1666 20L10.5 16.5" stroke={color} />
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke={color}
      />
    </svg>
  );
}

CheckCircleIcon.defaultProps = { width: 32, height: 32, color: "#BDBCC5" };

export default CheckCircleIcon;
