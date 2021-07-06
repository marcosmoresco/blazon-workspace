import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function TableIcon(props: IconProps) {
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
        d="M4.00003 7H28V24C28 24.2652 27.8946 24.5196 27.7071 24.7071C27.5196 24.8946 27.2652 25 27 25H5.00003C4.73481 25 4.48046 24.8946 4.29292 24.7071C4.10539 24.5196 4.00003 24.2652 4.00003 24V7Z"
        stroke={color}
      />
      <path 
        d="M4 13H28" 
        stroke={color} 
      />
      <path 
        d="M4 19H28" 
        stroke={color} 
      />
      <path 
        d="M11 13V25" 
        stroke={color} 
      />
    </svg>
  );
}

TableIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default TableIcon;