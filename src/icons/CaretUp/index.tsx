import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function CaretUpIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 20L16 10L26 20" stroke={color} strokeWidth={stroke}/>
    </svg>
  );
}

CaretUpIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default CaretUpIcon;