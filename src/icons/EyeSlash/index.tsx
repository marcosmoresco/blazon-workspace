import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
}

function EyeSlashIcon(props: IconProps) {
  const { width, height, color } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6 5L26 27' stroke='black' />
      <path
        d='M19.3634 19.6997C18.3822 20.5916 17.0868 21.0572 15.7623 20.9941C14.4378 20.9309 13.1926 20.3443 12.3006 19.3631C11.4086 18.3819 10.9429 17.0866 11.006 15.7621C11.069 14.4376 11.6555 13.1923 12.6366 12.3003'
        stroke='black'
      />
      <path
        d='M9.24931 8.5742C4.15315 11.1549 2 16 2 16C2 16 6 24.999 16 24.999C18.343 25.0177 20.6567 24.478 22.7497 23.4247'
        stroke='black'
      />
      <path
        d='M26.0762 21.1374C28.8014 18.6965 30 16 30 16C30 16 26 6.99902 16 6.99902C15.1339 6.99761 14.2692 7.06802 13.4147 7.20954'
        stroke='black'
      />
      <path
        d='M16.9409 11.0885C18.0036 11.2925 18.9715 11.8357 19.6994 12.6364C20.4274 13.4371 20.876 14.4523 20.9781 15.5296'
        stroke='black'
      />
    </svg>
  )
}

EyeSlashIcon.defaultProps = { width: 32, height: 32, color: 'black' }

export default EyeSlashIcon
