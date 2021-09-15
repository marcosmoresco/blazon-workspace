import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function SortAscendingIcon(props: IconProps) {
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
        d="M18 10.9992L23 5.99924L27.9999 10.9984"
        stroke={color}
        strokeWidth={stroke}
      />
      <path d="M23 17.9992V5.99921" stroke={color} strokeWidth={stroke} />
      <path d="M6 15.9992H14.9999" stroke={color} strokeWidth={stroke} />
      <path d="M6 7.99921H12.9999" stroke={color} strokeWidth={stroke} />
      <path d="M6 23.9992H22.9999" stroke={color} strokeWidth={stroke} />
    </svg>
  );
}

SortAscendingIcon.defaultProps = {
  width: 32,
  height: 32,
  color: "black",
  stroke: 1,
};

export default SortAscendingIcon;
