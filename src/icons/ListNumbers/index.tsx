import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function ListNumbersIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 16H26.9999" stroke={color} />
      <path d="M13 8H26.9999" stroke={color} />
      <path d="M12.9999 24H26.9999" stroke={color} />
      <path d="M5 7.5L7 6.5V13.4993" stroke={color} />
      <path
        d="M5.13752 19.0688C5.23255 18.844 5.37354 18.6415 5.55146 18.4744C5.72937 18.3073 5.94027 18.1793 6.1706 18.0985C6.40094 18.0178 6.64562 17.9861 6.88893 18.0055C7.13224 18.0249 7.3688 18.095 7.58342 18.2112C7.79804 18.3275 7.98596 18.4874 8.13513 18.6806C8.28429 18.8738 8.3914 19.096 8.44957 19.3331C8.50775 19.5701 8.51569 19.8167 8.47291 20.057C8.43012 20.2973 8.33754 20.526 8.20113 20.7284L5 25H8.5"
        stroke={color}
      />
    </svg>
  );
}

ListNumbersIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default ListNumbersIcon;
