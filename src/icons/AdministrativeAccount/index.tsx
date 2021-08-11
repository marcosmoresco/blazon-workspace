import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function AdministrativeAccountIcon(props: IconProps) {
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
        d="M7.49935 18.3332H12.4993C16.666 18.3332 18.3327 16.6665 18.3327 12.4998V7.49984C18.3327 3.33317 16.666 1.6665 12.4993 1.6665H7.49935C3.33268 1.6665 1.66602 3.33317 1.66602 7.49984V12.4998C1.66602 16.6665 3.33268 18.3332 7.49935 18.3332Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M13.5676 11.3417C12.626 12.2834 11.276 12.575 10.0843 12.2L7.92598 14.35C7.77598 14.5084 7.46764 14.6084 7.24264 14.575L6.24264 14.4417C5.90931 14.4 5.60931 14.0834 5.55931 13.7584L5.42598 12.7584C5.39264 12.5417 5.50098 12.2334 5.65098 12.075L7.80098 9.92503C7.43431 8.73337 7.71765 7.38337 8.65931 6.4417C10.0093 5.0917 12.2093 5.0917 13.5676 6.4417C14.9176 7.78337 14.9176 9.98337 13.5676 11.3417Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M8.70833 13.5668L8 12.8501"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M11.1621 8.91667H11.1696"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

AdministrativeAccountIcon.defaultProps = {
  width: 20,
  height: 20,
  color: "black",
  stroke: 1,
};

export default AdministrativeAccountIcon;
