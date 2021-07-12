import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
}

function EyeIcon(props: IconProps) {
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
        d='M16 6.99902C6 6.99902 2 16 2 16C2 16 6 24.999 16 24.999C26 24.999 30 16 30 16C30 16 26 6.99902 16 6.99902Z'
        stroke='black'
      />
      <path
        d='M16 21.0001C18.7614 21.0001 21 18.7615 21 16.0001C21 13.2387 18.7614 11.0001 16 11.0001C13.2386 11.0001 11 13.2387 11 16.0001C11 18.7615 13.2386 21.0001 16 21.0001Z'
        stroke='black'
      />
    </svg>
  )
}

EyeIcon.defaultProps = { width: 32, height: 32, color: 'black' }

export default EyeIcon