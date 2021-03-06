import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function CalendarBlankIcon(props: IconProps) {
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
        d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
        stroke={color}
      />
      <path 
        d="M22 3V7" 
        stroke={color} 
      />
      <path 
        d="M10 3V7" 
        stroke={color} 
      />
      <path 
        d="M5 11H27" 
        stroke={color} 
      />
    </svg>
  );
}

CalendarBlankIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default CalendarBlankIcon;