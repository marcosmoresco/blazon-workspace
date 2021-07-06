import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function CaretRightIcon(props: IconProps) {
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
        d="M12 6L22 16L12 26" 
        stroke={color} 
      />
    </svg>
  );
}

CaretRightIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default CaretRightIcon;