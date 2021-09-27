import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function FolderIcon(props: IconProps) {
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
        d="M27.1111 26H4.92308C4.67848 25.9993 4.44411 25.9018 4.27115 25.7288C4.0982 25.5559 4.00072 25.3215 4 25.0769V10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11V25.1111C28 25.3469 27.9063 25.573 27.7397 25.7397C27.573 25.9063 27.3469 26 27.1111 26V26Z"
        stroke={color}
        strokeWidth={stroke}
      />
      <path
        d="M4 10V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H11.5858C11.7171 6 11.8471 6.02587 11.9685 6.07612C12.0898 6.12638 12.2 6.20004 12.2929 6.29289L16 10"
        stroke={color}
        strokeWidth={stroke}
      />
    </svg>
  );
}

FolderIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default FolderIcon;
