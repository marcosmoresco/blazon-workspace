import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function BrowsersIcon(props: IconProps) {
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
        d="M23.001 10H5.00098C4.44869 10 4.00098 10.4477 4.00098 11V25C4.00098 25.5523 4.44869 26 5.00098 26H23.001C23.5533 26 24.001 25.5523 24.001 25V11C24.001 10.4477 23.5533 10 23.001 10Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.00098 10V7C8.00098 6.73478 8.10633 6.48043 8.29387 6.29289C8.48141 6.10536 8.73576 6 9.00098 6H27.001C27.2662 6 27.5205 6.10536 27.7081 6.29289C27.8956 6.48043 28.001 6.73478 28.001 7V21C28.001 21.2652 27.8956 21.5196 27.7081 21.7071C27.5205 21.8946 27.2662 22 27.001 22H24.001"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 14H24"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

BrowsersIcon.defaultProps = { width: 32, height: 32, color: "#000000" };

export default BrowsersIcon;
