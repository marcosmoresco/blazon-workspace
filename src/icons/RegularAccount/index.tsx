import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function RegularAccountIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 20 20`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.64258 6.19971L10.0009 10.458L17.3092 6.22471"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M10 18.0085V10.4502"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M8.27552 2.06658L3.82552 4.53324C2.81719 5.09158 1.99219 6.49158 1.99219 7.64158V12.3499C1.99219 13.4999 2.81719 14.8999 3.82552 15.4582L8.27552 17.9332C9.22552 18.4582 10.7839 18.4582 11.7339 17.9332L16.1839 15.4582C17.1922 14.8999 18.0172 13.4999 18.0172 12.3499V7.64158C18.0172 6.49158 17.1922 5.09158 16.1839 4.53324L11.7339 2.05824C10.7755 1.53324 9.22552 1.53324 8.27552 2.06658Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

RegularAccountIcon.defaultProps = {
  width: 20,
  height: 20,
  color: "black",
  stroke: 1,
};

export default RegularAccountIcon;
