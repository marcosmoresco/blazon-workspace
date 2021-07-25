import React from 'react'

export type IconProps = {
  width?: number
  height?: number
}

function PlusIcon(props: IconProps) {
  const { width, height } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='26' height='26' rx='13' fill='#08C581' />
      <path
        d='M6.8125 13H19.1875'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13 6.8125V19.1875'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

PlusIcon.defaultProps = { width: 48, height: 48 }

export default PlusIcon
