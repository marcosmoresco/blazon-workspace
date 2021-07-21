import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
}

function UploadIcon(props: IconProps) {
  const { width, height, color } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${height} ${width}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.5 20.4932L32 9.99316L42.5 20.4932'
        stroke={color}
        strokeWidth='2'
      />
      <path d='M32 38V10' stroke={color} strokeWidth='2' />
      <path
        d='M56 34V52C56 52.5304 55.7893 53.0391 55.4142 53.4142C55.0391 53.7893 54.5304 54 54 54H10C9.46957 54 8.96086 53.7893 8.58579 53.4142C8.21071 53.0391 8 52.5304 8 52V34'
        stroke={color}
        strokeWidth='2'
      />
    </svg>
  )
}

UploadIcon.defaultProps = { width: 32, height: 32, color: 'black' }

export default UploadIcon
