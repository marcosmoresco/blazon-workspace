import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function SeachIcon(props: IconProps) {
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
        d="M14.4999 25C20.2989 25 24.9999 20.299 24.9999 14.5C24.9999 8.70101 20.2989 4 14.4999 4C8.70089 4 3.99988 8.70101 3.99988 14.5C3.99988 20.299 8.70089 25 14.4999 25Z"
        stroke={color}
      />
      <path
        d="M21.9241 21.925L27.9991 28.0001"
        stroke={color}
      />
    </svg>
  );
}

SeachIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default SeachIcon;