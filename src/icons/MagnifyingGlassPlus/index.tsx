import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function MagnifyingGlassPlusIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4999 14.5H18.4999"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M14.4999 10.5V18.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M14.4999 24.9995C20.2989 24.9995 24.9999 20.2985 24.9999 14.4995C24.9999 8.70052 20.2989 3.99951 14.4999 3.99951C8.70089 3.99951 3.99988 8.70052 3.99988 14.4995C3.99988 20.2985 8.70089 24.9995 14.4999 24.9995Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M21.9241 21.9246L27.9991 27.9996"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

MagnifyingGlassPlusIcon.defaultProps = {
  width: 32,
  height: 32,
  color: "black",
  stroke: 1,
};

export default MagnifyingGlassPlusIcon;
