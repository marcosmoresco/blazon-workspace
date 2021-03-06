import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function BellSimpleIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 28H20" stroke={color} />
      <path
        d="M7.02535 13C7.02369 11.814 7.25679 10.6394 7.7112 9.54392C8.16561 8.44844 8.83235 7.45373 9.67299 6.61713C10.5136 5.78053 11.5115 5.11858 12.6092 4.66945C13.7069 4.22031 14.8825 3.99287 16.0685 4.00023C21.0172 4.03702 24.9756 8.1504 24.9756 13.113V14C24.9756 18.4769 25.9122 21.0749 26.7372 22.4948C26.8261 22.6465 26.8734 22.8189 26.8743 22.9948C26.8752 23.1706 26.8298 23.3436 26.7426 23.4962C26.6553 23.6489 26.5294 23.7758 26.3774 23.8643C26.2254 23.9527 26.0528 23.9995 25.877 24H6.12292C5.94707 23.9995 5.77445 23.9527 5.62248 23.8642C5.4705 23.7758 5.34454 23.6488 5.25731 23.4961C5.17008 23.3434 5.12465 23.1704 5.12563 22.9946C5.1266 22.8187 5.17393 22.6463 5.26284 22.4945C6.08825 21.0746 7.02534 18.4767 7.02534 14L7.02535 13Z"
        stroke={color}
        strokeWidth={stroke}
      />
    </svg>
  );
}

BellSimpleIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default BellSimpleIcon;