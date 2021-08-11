import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
};

function SecurityUserIcon(props: IconProps) {
  const { width, height, color, stroke } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 20 20`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.86663 1.67242L4.12414 3.07492C3.26164 3.39742 2.55664 4.41741 2.55664 5.33991V10.9124C2.55664 11.7974 3.14165 12.9599 3.85415 13.4924L7.07914 15.8999C8.13664 16.6949 9.87663 16.6949 10.9341 15.8999L14.1591 13.4924C14.8716 12.9599 15.4566 11.7974 15.4566 10.9124V5.33991C15.4566 4.41741 14.7516 3.39742 13.8891 3.07492L10.1466 1.67242C9.50914 1.43992 8.48913 1.43992 7.86663 1.67242Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M8.99977 8.18982C8.96977 8.18982 8.93227 8.18982 8.90227 8.18982C8.19727 8.16732 7.63477 7.58231 7.63477 6.86981C7.63477 6.14231 8.22727 5.5498 8.95477 5.5498C9.68227 5.5498 10.2748 6.14231 10.2748 6.86981C10.2673 7.58981 9.70477 8.16732 8.99977 8.18982Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      <path
        d="M7.5068 10.29C6.7868 10.77 6.7868 11.5575 7.5068 12.0375C8.3243 12.585 9.6668 12.585 10.4843 12.0375C11.2043 11.5575 11.2043 10.77 10.4843 10.29C9.6743 9.74252 8.3318 9.74252 7.5068 10.29Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}

SecurityUserIcon.defaultProps = {
  width: 20,
  height: 20,
  color: "black",
  stroke: 1,
};

export default SecurityUserIcon;
