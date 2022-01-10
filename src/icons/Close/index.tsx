import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function CloseIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect width="30" height="30" rx="6" fill="#F6F6F7" />
      <path
        d="M15 21.75C18.7279 21.75 21.75 18.7279 21.75 15C21.75 11.2721 18.7279 8.25 15 8.25C11.2721 8.25 8.25 11.2721 8.25 15C8.25 18.7279 11.2721 21.75 15 21.75Z"
        stroke="#514D65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 12.75L12.75 17.25"
        stroke="#514D65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 17.25L12.75 12.75"
        stroke="#514D65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

CloseIcon.defaultProps = { width: 90, height: 90 };

export default CloseIcon;
