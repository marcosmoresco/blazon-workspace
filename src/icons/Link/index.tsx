import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function LinkIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 14 14`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M13.0551 0H9.23856C8.94713 0 8.71094 0.236195 8.71094 0.527652C8.71094 0.819082 8.94713 1.05528 9.23856 1.05528H12.5275V4.34421C12.5275 4.63564 12.7637 4.87184 13.0551 4.87184C13.3466 4.87184 13.5828 4.63564 13.5828 4.34421V0.527652C13.5828 0.236195 13.3466 0 13.0551 0Z"
          fill={color}
        />
        <path
          d="M13.4283 0.154608C13.2222 -0.0515361 12.8884 -0.0515361 12.6823 0.154608L5.15461 7.68223C4.94846 7.88819 4.94846 8.22235 5.15461 8.42831C5.2575 8.53137 5.39258 8.58291 5.52766 8.58291C5.66255 8.58291 5.79762 8.53137 5.90071 8.42831L13.4283 0.900683C13.6345 0.69473 13.6345 0.360562 13.4283 0.154608Z"
          fill={color}
        />
        <path
          d="M11.6784 6.5603C11.387 6.5603 11.1508 6.79649 11.1508 7.08792V12.9447H1.05528V2.84922H6.91206C7.20349 2.84922 7.43969 2.61303 7.43969 2.3216C7.43969 2.03017 7.20349 1.79395 6.91206 1.79395H0.527652C0.236195 1.79395 0 2.03014 0 2.3216V13.4724C0 13.7638 0.236195 14 0.527652 14H11.6784C11.97 14 12.206 13.7638 12.206 13.4723V7.08792C12.206 6.79649 11.9698 6.5603 11.6784 6.5603Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

LinkIcon.defaultProps = { width: 14, height: 14, color: "#000000" };

export default LinkIcon;

<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
></svg>;
