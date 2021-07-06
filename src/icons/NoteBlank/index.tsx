import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function NoteBlankIcon(props: IconProps) {
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
        d="M19.5858 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H26C26.2652 5 26.5196 5.10536 26.7071 5.29289C26.8946 5.48043 27 5.73478 27 6V19.5858C27 19.7171 26.9741 19.8471 26.9239 19.9685C26.8736 20.0898 26.8 20.2 26.7071 20.2929L20.2929 26.7071C20.2 26.8 20.0898 26.8736 19.9685 26.9239C19.8471 26.9741 19.7171 27 19.5858 27V27Z"
        stroke={color}
      />
      <path 
        d="M26.9099 19.999H20V26.909" 
        stroke={color} 
      />
    </svg>
  );
}

NoteBlankIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default NoteBlankIcon;