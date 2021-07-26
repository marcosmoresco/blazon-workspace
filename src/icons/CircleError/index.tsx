import React from 'react'

export type IconProps = {
  width?: number
  height?: number
}

function CircleErrorIcon(props: IconProps) {
  const { width, height } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 90 90'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='45' cy='45' r='37' fill='#FF134A' fillOpacity='0.06' />
      <circle cx='45' cy='45' r='45' fill='#FF134A' fillOpacity='0.06' />
      <path
        d='M45 69C58.2548 69 69 58.2548 69 45C69 31.7452 58.2548 21 45 21C31.7452 21 21 31.7452 21 45C21 58.2548 31.7452 69 45 69Z'
        stroke='#FF134A'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M53 37L37 53'
        stroke='#FF134A'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M53 53L37 37'
        stroke='#FF134A'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

CircleErrorIcon.defaultProps = { width: 90, height: 90 }

export default CircleErrorIcon
