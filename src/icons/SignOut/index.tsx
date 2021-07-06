import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function SignOutIcon(props: IconProps) {
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
        d="M21.7537 10.75L27.0037 16L21.7537 21.25"
        stroke={`${color || "black"}`}
      />
      <path d="M13 16H27" stroke={`${color || "black"}`} />
      <path
        d="M15 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H15"
        stroke={`${color || "black"}`}
      />
    </svg>
  );
}

SignOutIcon.defaultProps = { width: 32, height: 32, color: "black" };

export default SignOutIcon;