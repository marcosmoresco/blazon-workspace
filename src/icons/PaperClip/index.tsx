import React from "react";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

function PaperClipIcon(props: IconProps) {
  const { width, height, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4995 4.24963L3.99112 10.8661C3.7567 11.1006 3.625 11.4185 3.625 11.75C3.625 12.0815 3.7567 12.3995 3.99112 12.6339C4.22554 12.8683 4.54348 13 4.875 13C5.20652 13 5.52446 12.8683 5.75888 12.6339L13.5173 4.7674C13.7495 4.53525 13.9336 4.25966 14.0592 3.95634C14.1849 3.65303 14.2495 3.32794 14.2495 2.99963C14.2495 2.67133 14.1849 2.34624 14.0592 2.04293C13.9336 1.73961 13.7495 1.46401 13.5173 1.23187C13.2852 0.99972 13.0096 0.815572 12.7063 0.689935C12.4029 0.564298 12.0778 0.499634 11.7495 0.499634C11.4212 0.499634 11.0961 0.564298 10.7928 0.689935C10.4895 0.815572 10.2139 0.999721 9.98178 1.23187L2.22335 9.09836C1.52009 9.80163 1.125 10.7555 1.125 11.75C1.125 12.7446 1.52009 13.6984 2.22335 14.4017C2.92661 15.1049 3.88044 15.5 4.875 15.5C5.86956 15.5 6.82339 15.1049 7.52665 14.4017L13.937 7.99964"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

PaperClipIcon.defaultProps = { width: 15, height: 16, color: "#1B202A" };

export default PaperClipIcon;
