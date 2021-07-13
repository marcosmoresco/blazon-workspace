import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function ArrowClockwiseIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 20 20`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.58326 2.0219L3.28213 3.28213L2.0219 9.58326C2.00172 9.68416 2.00677 9.78847 2.03658 9.88695C2.0664 9.98543 2.12007 10.075 2.19282 10.1478L10.3532 18.3081C10.4112 18.3662 10.4801 18.4122 10.556 18.4436C10.6318 18.475 10.7131 18.4912 10.7951 18.4912C10.8772 18.4912 10.9585 18.475 11.0343 18.4436C11.1101 18.4122 11.179 18.3662 11.2371 18.3081L18.3081 11.2371C18.3662 11.179 18.4122 11.1101 18.4436 11.0343C18.475 10.9585 18.4912 10.8772 18.4912 10.7951C18.4912 10.7131 18.475 10.6318 18.4436 10.556C18.4122 10.4801 18.3662 10.4112 18.3081 10.3532L10.1478 2.19282C10.075 2.12007 9.98543 2.0664 9.88695 2.03658C9.78847 2.00677 9.68416 2.00172 9.58326 2.0219V2.0219Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.5625 7.1875C6.90768 7.1875 7.1875 6.90768 7.1875 6.5625C7.1875 6.21732 6.90768 5.9375 6.5625 5.9375C6.21732 5.9375 5.9375 6.21732 5.9375 6.5625C5.9375 6.90768 6.21732 7.1875 6.5625 7.1875Z"
        fill="black"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

ArrowClockwiseIcon.defaultProps = { width: 18, height: 18, color: "#1B202A" };

export default ArrowClockwiseIcon;
