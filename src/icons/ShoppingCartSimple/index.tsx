import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function ShoppingCartSimpleIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8H26.8019C26.9484 8 27.093 8.03217 27.2257 8.09424C27.3584 8.15632 27.4758 8.24677 27.5696 8.35921C27.6635 8.47166 27.7315 8.60334 27.7688 8.74496C27.8062 8.88659 27.812 9.03468 27.7858 9.17879L25.6052 21.1788C25.5634 21.4092 25.4419 21.6176 25.2621 21.7677C25.0823 21.9178 24.8555 22 24.6213 22H8.38982C8.15572 22 7.92904 21.9179 7.74927 21.7679C7.5695 21.618 7.44804 21.4097 7.40604 21.1794L4.24055 3.8206C4.19855 3.5903 4.07709 3.38203 3.89732 3.23208C3.71755 3.08213 3.49087 3 3.25677 3H1"
        stroke={color}
        strokeWidth={stroke}
      />
      <path
        d="M9 28.5C9.82843 28.5 10.5 27.8284 10.5 27C10.5 26.1716 9.82843 25.5 9 25.5C8.17157 25.5 7.5 26.1716 7.5 27C7.5 27.8284 8.17157 28.5 9 28.5Z"
        fill={color}
        strokeWidth={stroke}
      />
      <path
        d="M24 28.5C24.8284 28.5 25.5 27.8284 25.5 27C25.5 26.1716 24.8284 25.5 24 25.5C23.1716 25.5 22.5 26.1716 22.5 27C22.5 27.8284 23.1716 28.5 24 28.5Z"
        fill={color}
        strokeWidth={stroke}
      />
    </svg>
  );
}

ShoppingCartSimpleIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default ShoppingCartSimpleIcon;