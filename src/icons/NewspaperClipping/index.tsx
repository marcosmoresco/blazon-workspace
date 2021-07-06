import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function NewspaperClippingIcon(props: IconProps) {
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
        d="M4 27V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V27L24 25L20 27L16 25L12 27L8 25L4 27Z"
        stroke={color}
      />
      <path 
        d="M18 14H24" 
        stroke={color} 
      />
      <path 
        d="M18 18H24" 
        stroke={color} 
      />
      <path 
        d="M14 12H8V20H14V12Z" 
        stroke={color} 
      />
    </svg>
  );
}

NewspaperClippingIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default NewspaperClippingIcon;