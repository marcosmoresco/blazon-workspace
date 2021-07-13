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
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 13.5C9.31066 13.5 9.5625 13.2482 9.5625 12.9375C9.5625 12.6268 9.31066 12.375 9 12.375C8.68934 12.375 8.4375 12.6268 8.4375 12.9375C8.4375 13.2482 8.68934 13.5 9 13.5Z"
        fill={color}
      />
    </svg>
  );
}

ArrowClockwiseIcon.defaultProps = { width: 18, height: 18, color: "#76797F" };

export default ArrowClockwiseIcon;
