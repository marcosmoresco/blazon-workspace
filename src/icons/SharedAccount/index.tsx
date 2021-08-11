import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function SharedAccountIcon(props: IconProps) {
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
        d="M18.3333 12.5C18.3333 15.725 15.725 18.3333 12.5 18.3333L13.375 16.875"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M1.66602 7.49984C1.66602 4.27484 4.27435 1.6665 7.49935 1.6665L6.62435 3.12484"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M11.416 3.70801L14.7327 5.62466L18.016 3.71635"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M14.7324 9.01622V5.61621"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M13.95 1.8415L11.95 2.9498C11.5 3.1998 11.125 3.83313 11.125 4.34979V6.46649C11.125 6.98316 11.4917 7.61649 11.95 7.86649L13.95 8.97484C14.375 9.2165 15.075 9.2165 15.5083 8.97484L17.5083 7.86649C17.9583 7.61649 18.3333 6.98316 18.3333 6.46649V4.34979C18.3333 3.83313 17.9667 3.1998 17.5083 2.9498L15.5083 1.8415C15.0833 1.60817 14.3833 1.60817 13.95 1.8415Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M1.95703 12.875L5.26537 14.7917L8.55703 12.8833"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M5.26562 18.1832V14.7832"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M4.49102 11.0085L2.49102 12.1168C2.04102 12.3668 1.66602 13.0001 1.66602 13.5168V15.6335C1.66602 16.1502 2.03269 16.7835 2.49102 17.0335L4.49102 18.1418C4.91602 18.3835 5.61601 18.3835 6.04934 18.1418L8.04935 17.0335C8.49935 16.7835 8.87434 16.1502 8.87434 15.6335V13.5168C8.87434 13.0001 8.50769 12.3668 8.04935 12.1168L6.04934 11.0085C5.61601 10.7752 4.91602 10.7752 4.49102 11.0085Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

SharedAccountIcon.defaultProps = { width: 20, height: 20, color: "black", stroke: 1 };

export default SharedAccountIcon;
