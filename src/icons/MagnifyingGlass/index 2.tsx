import React from 'react'

export type IconProps = {
  width?: number
  height?: number
}

function MagnifyingGlassIcon(props: IconProps) {
  const { width, height } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.4998 25C20.2987 25 24.9998 20.299 24.9998 14.5C24.9998 8.70101 20.2987 4 14.4998 4C8.70077 4 3.99976 8.70101 3.99976 14.5C3.99976 20.299 8.70077 25 14.4998 25Z'
        stroke='#7D7A8C'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M21.9241 21.9248L27.9991 27.9999'
        stroke='#7D7A8C'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

MagnifyingGlassIcon.defaultProps = { width: 32, height: 32, color: 'black' }

export default MagnifyingGlassIcon
