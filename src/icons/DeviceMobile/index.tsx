import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function DeviceMobileIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 3H10C8.89543 3 8 3.89543 8 5V27C8 28.1046 8.89543 29 10 29H22C23.1046 29 24 28.1046 24 27V5C24 3.89543 23.1046 3 22 3Z"
        stroke={color}
        strokeWidth={stroke}
      />
      <path d="M8 7H24" stroke={color} strokeWidth={stroke} />
      <path d="M8 25H24" stroke={color} strokeWidth={stroke} />
    </svg>
  );
}

DeviceMobileIcon.defaultProps = {
  width: 32,
  height: 32,
  color: "black",
  stroke: 1,
};

export default DeviceMobileIcon;
