import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
}

function CameraIcon(props: IconProps) {
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
        d='M19.5 19.5H4.5C4.10218 19.5 3.72064 19.342 3.43934 19.0607C3.15804 18.7794 3 18.3978 3 18L3 7.5C3 7.10218 3.15804 6.72064 3.43934 6.43934C3.72064 6.15804 4.10218 6 4.5 6L7.49945 6L8.99945 3.75L14.9995 3.75L16.4995 6L19.5 6C19.8978 6 20.2794 6.15804 20.5607 6.43934C20.842 6.72064 21 7.10218 21 7.5L21 18C21 18.3978 20.842 18.7794 20.5607 19.0607C20.2794 19.342 19.8978 19.5 19.5 19.5Z'
        stroke={color}
      />
      <path
        d='M12 15.75C13.864 15.75 15.375 14.239 15.375 12.375C15.375 10.511 13.864 9 12 9C10.136 9 8.625 10.511 8.625 12.375C8.625 14.239 10.136 15.75 12 15.75Z'
        stroke={color}
      />
    </svg>
  )
}

CameraIcon.defaultProps = { width: 32, height: 32, color: 'white' }

export default CameraIcon
