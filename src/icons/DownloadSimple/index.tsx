import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function DownloadSimpleIcon(props: IconProps) {
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
        d="M10.75 13.75L16 19L21.25 13.75"
        stroke={color}
        strokeWidth={stroke}
      />
      <path d="M16 4.99634V18.9963" stroke={color} strokeWidth={stroke} />
      <path
        d="M28 17V26C28 26.2652 27.8946 26.5196 27.7071 26.7071C27.5196 26.8946 27.2652 27 27 27H5C4.73478 27 4.48043 26.8946 4.29289 26.7071C4.10536 26.5196 4 26.2652 4 26V17"
        stroke={color}
        strokeWidth={stroke}
      />
    </svg>
  );
}

DownloadSimpleIcon.defaultProps = {
  width: 32,
  height: 32,
  color: "black",
  stroke: 1,
};

export default DownloadSimpleIcon;
