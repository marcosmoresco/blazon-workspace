import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function LoadingIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >      
      <path fillRule="evenodd" clipRule="evenodd" d="M24 14C23.0412 19.6754 18.0709 24 12.0835 24C5.40999 24 0 18.6274 0 12C0 5.37258 5.40999 0 12.0835 0C18.0709 0 23.0412 4.32457 24 10H21.9517C21.0187 5.43552 16.9551 2 12.0835 2C6.52224 2 2.01392 6.47715 2.01392 12C2.01392 17.5228 6.52224 22 12.0835 22C16.9551 22 21.0187 18.5645 21.9517 14H24Z" fill="url(#paint0_linear)"/>
      <defs>
        <linearGradient id="paint0_linear" x1="9.56614" y1="7.5" x2="22.6066" y2="15.5808" gradientUnits="userSpaceOnUse">
          <stop stopColor={color}/>
          <stop offset="1" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

LoadingIcon.defaultProps = { width: 32, height: 32, color: "#FFFFFF" };

export default LoadingIcon;
