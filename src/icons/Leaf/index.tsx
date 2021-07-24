import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function LeafIcon(props: IconProps) {
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
        d="M20 12L3 29"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.84788 26.1521C4.88861 23.3229 4.74001 20.2817 5.4189 17.3725C6.09779 14.4632 7.57707 11.8019 9.6895 9.6895C11.8019 7.57707 14.4632 6.09779 17.3725 5.4189C20.2817 4.74001 23.3229 4.88861 26.1521 5.84788C27.1114 8.6771 27.26 11.7183 26.5811 14.6275C25.9022 17.5368 24.4229 20.1981 22.3105 22.3105C20.1981 24.4229 17.5368 25.9022 14.6275 26.5811C11.7183 27.26 8.6771 27.1114 5.84788 26.1521V26.1521Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

LeafIcon.defaultProps = { width: 32, height: 32, color: "#000000" };

export default LeafIcon;
