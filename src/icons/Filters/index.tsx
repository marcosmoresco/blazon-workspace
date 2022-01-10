import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function FiltersIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="29" height="29" rx="5.5" fill="#F6F6F7" />
      <path
        d="M16.4062 18.0933L8.81247 18.0933"
        stroke="#0E46D7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1875 18.0933L19.2187 18.0933"
        stroke="#0E46D7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8125 19.4995C18.5891 19.4995 19.2187 18.8699 19.2187 18.0933C19.2187 17.3166 18.5891 16.687 17.8125 16.687C17.0358 16.687 16.4062 17.3166 16.4062 18.0933C16.4062 18.8699 17.0358 19.4995 17.8125 19.4995Z"
        stroke="#0E46D7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9062 11.9058L8.81247 11.9058"
        stroke="#0E46D7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1875 11.9058L14.7187 11.9058"
        stroke="#0E46D7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3125 13.312C14.0891 13.312 14.7187 12.6824 14.7187 11.9058C14.7187 11.1291 14.0891 10.4995 13.3125 10.4995C12.5358 10.4995 11.9062 11.1291 11.9062 11.9058C11.9062 12.6824 12.5358 13.312 13.3125 13.312Z"
        stroke="#0E46D7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="29" height="29" rx="5.5" stroke="#CFDAF7" />
    </svg>
  );
}

FiltersIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default FiltersIcon;
