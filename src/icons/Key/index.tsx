import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
}

function KeyIcon(props: IconProps) {
  const { width, height, color } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.6461 15.3541C10.8752 13.4313 10.7919 11.3013 11.4101 9.32418C12.0284 7.34704 13.3104 5.64401 15.0394 4.50295C16.7683 3.3619 18.8383 2.85281 20.8993 3.06173C22.9603 3.27066 24.8859 4.18479 26.3507 5.6496C27.8155 7.11442 28.7297 9.04007 28.9386 11.1011C29.1475 13.1621 28.6384 15.232 27.4973 16.961C26.3563 18.6899 24.6532 19.9719 22.6761 20.5902C20.699 21.2084 18.569 21.1251 16.6462 20.3542L16.6463 20.354L15.0003 22H12.0003V25H9.00031V28H4.00031V23L11.6463 15.354L11.6461 15.3541Z'
        stroke={color}
      />
      <path
        d='M22.5 10.5C23.0523 10.5 23.5 10.0523 23.5 9.5C23.5 8.94772 23.0523 8.5 22.5 8.5C21.9477 8.5 21.5 8.94772 21.5 9.5C21.5 10.0523 21.9477 10.5 22.5 10.5Z'
        fill={color}
      />
    </svg>
  )
}

KeyIcon.defaultProps = { width: 32, height: 32, color: 'black' }

export default KeyIcon
