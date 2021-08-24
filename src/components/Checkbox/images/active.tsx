import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};
function ActiveIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill={color} stroke="#FFFFFF"/>
      <path d="M18 8L9.75 17L6 12.9091" stroke="#F1F1FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>     
    </svg>
  );
}

ActiveIcon.defaultProps = { width: 24, height: 24, color: "00659B" };

export default ActiveIcon;
