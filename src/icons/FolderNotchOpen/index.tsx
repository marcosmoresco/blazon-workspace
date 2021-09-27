import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function FolderNotchOpenIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 26V8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H11.6667C11.883 7 12.0936 7.07018 12.2667 7.2L15.7333 9.8C15.9064 9.92982 16.117 10 16.3333 10H25C25.2652 10 25.5196 10.1054 25.7071 10.2929C25.8946 10.4804 26 10.7348 26 11V14" stroke={color} strokeWidth={stroke}/>
      <path d="M4 26L7.74856 16.6286C7.82278 16.443 7.95091 16.284 8.1164 16.1719C8.2819 16.0599 8.47717 16 8.67703 16H14.6972C14.8946 16 15.0877 15.9416 15.2519 15.8321L17.7481 14.1679C17.9123 14.0584 18.1054 14 18.3028 14H28.6126C28.771 14 28.9272 14.0377 29.0683 14.1099C29.2093 14.1821 29.3312 14.2867 29.4238 14.4153C29.5165 14.5438 29.5772 14.6926 29.6011 14.8492C29.625 15.0058 29.6114 15.1659 29.5613 15.3162L26 26H4Z" stroke={color} strokeWidth={stroke}/>     
    </svg>
  );
}

FolderNotchOpenIcon.defaultProps = { width: 32, height: 32, color: "black", stroke: 1 };

export default FolderNotchOpenIcon;
