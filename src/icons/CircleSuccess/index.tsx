import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
}

function CircleSuccessIcon(props: IconProps) {
  const { width, height, color } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 90 90'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='45' cy='45' r='37' fill='#4EB862' fillOpacity='0.06' />
      <circle cx='45' cy='45' r='45' fill='#4EB862' fillOpacity='0.06' />
      <circle cx='45' cy='45' r='32' fill='#4EB862' fillOpacity='0.06' />
      <path
        d='M56 39L41.3333 53L34 46'
        stroke='#4EB862'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M45 69C58.2548 69 69 58.2548 69 45C69 31.7452 58.2548 21 45 21C31.7452 21 21 31.7452 21 45C21 58.2548 31.7452 69 45 69Z'
        stroke='#4EB862'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

CircleSuccessIcon.defaultProps = { width: 90, height: 90 }

export default CircleSuccessIcon
