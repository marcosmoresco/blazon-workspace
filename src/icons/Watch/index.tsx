import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function WatchIcon(props: IconProps) {
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
        d="M16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M16 11V16H21"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M11 8.51597L11.851 3.82162C11.8928 3.5911 12.0142 3.38257 12.1941 3.23241C12.3739 3.08225 12.6007 3 12.835 3H19.165C19.3993 3 19.6261 3.08225 19.8059 3.23241C19.9858 3.38257 20.1072 3.5911 20.149 3.82162L21 8.516"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M11 23.484L11.851 28.1784C11.8928 28.4089 12.0142 28.6174 12.1941 28.7676C12.3739 28.9177 12.6007 29 12.835 29H19.165C19.3993 29 19.6261 28.9177 19.8059 28.7676C19.9858 28.6174 20.1072 28.4089 20.149 28.1784L21 23.484"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

WatchIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default WatchIcon;
