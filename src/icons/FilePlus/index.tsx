import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function FilePlusIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M37.5 42H10.4985C10.1007 42 9.71918 41.842 9.43787 41.5607C9.15657 41.2794 8.99854 40.8978 8.99854 40.5V7.5C8.99854 7.10218 9.15657 6.72064 9.43787 6.43934C9.71918 6.15804 10.1007 6 10.4985 6H28.5L39 16.5V40.5C39 40.697 38.9612 40.892 38.8858 41.074C38.8104 41.256 38.7 41.4214 38.5607 41.5607C38.4214 41.7 38.256 41.8104 38.074 41.8858C37.892 41.9612 37.697 42 37.5 42Z" 
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28.5 6V16.5H39.0015" 
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19.5 28.5H28.5" 
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 24V33" 
        stroke={color} 
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

FilePlusIcon.defaultProps = { width: 48, height: 48, color: "#BDBCC5", stroke: 1 };

export default FilePlusIcon;
