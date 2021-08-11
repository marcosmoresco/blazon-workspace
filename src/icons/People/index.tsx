import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function PeopleIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 18 18`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5005 5.37C13.4555 5.3625 13.403 5.3625 13.358 5.37C12.323 5.3325 11.498 4.485 11.498 3.435C11.498 2.3625 12.3605 1.5 13.433 1.5C14.5055 1.5 15.368 2.37 15.368 3.435C15.3605 4.485 14.5355 5.3325 13.5005 5.37Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M12.7276 10.8301C13.7551 11.0026 14.8876 10.8226 15.6826 10.2901C16.7401 9.58512 16.7401 8.43012 15.6826 7.72512C14.8801 7.19262 13.7326 7.01262 12.7051 7.19262"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M4.47688 5.37C4.52188 5.3625 4.57438 5.3625 4.61938 5.37C5.65438 5.3325 6.47937 4.485 6.47937 3.435C6.47937 2.3625 5.61688 1.5 4.54438 1.5C3.47188 1.5 2.60938 2.37 2.60938 3.435C2.61687 4.485 3.44188 5.3325 4.47688 5.37Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M5.25008 10.8301C4.22258 11.0026 3.09008 10.8226 2.29508 10.2901C1.23758 9.58512 1.23758 8.43012 2.29508 7.72512C3.09758 7.19262 4.24508 7.01262 5.27258 7.19262"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M8.99859 10.9725C8.95359 10.965 8.90109 10.965 8.85609 10.9725C7.82109 10.935 6.99609 10.0875 6.99609 9.03754C6.99609 7.96504 7.85859 7.10254 8.93109 7.10254C10.0036 7.10254 10.8661 7.97254 10.8661 9.03754C10.8586 10.0875 10.0336 10.9425 8.99859 10.9725Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M6.81656 13.335C5.75906 14.04 5.75906 15.195 6.81656 15.9C8.01656 16.7025 9.98156 16.7025 11.1816 15.9C12.2391 15.195 12.2391 14.04 11.1816 13.335C9.98906 12.54 8.01656 12.54 6.81656 13.335Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

PeopleIcon.defaultProps = {
  width: 18,
  height: 18,
  color: "#7D7A8C",
  stroke: 1,
};

export default PeopleIcon;
