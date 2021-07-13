import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function CalendarIcon(props: IconProps) {
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
      <path
        d="M11.5 15.9996H15L13 18.4996C13.3289 18.4996 13.6526 18.5807 13.9427 18.7357C14.2327 18.8907 14.48 19.1148 14.6628 19.3882C14.8455 19.6616 14.958 19.9758 14.9903 20.3031C15.0226 20.6304 14.9737 20.9605 14.848 21.2644C14.7222 21.5682 14.5235 21.8364 14.2694 22.0451C14.0153 22.2538 13.7136 22.3967 13.3911 22.461C13.0686 22.5253 12.7352 22.5091 12.4205 22.4138C12.1057 22.3185 11.8193 22.1471 11.5866 21.9147"
        stroke={color}        
      />
      <path
        d="M18 17.4996L20 15.9996V22.4996"
        stroke={color}        
      />
    </svg>
  );
}

CalendarIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default CalendarIcon;
