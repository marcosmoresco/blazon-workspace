import React from 'react'

export type IconProps = {
  width?: number
  height?: number
}

function NotebookIcon(props: IconProps) {
  const { width, height } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.3335 19.333H30.0002'
        stroke='#3174F6'
        strokeWidth='2.4375'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M19.3335 24.665H30.0002'
        stroke='black'
        strokeWidth='2.4375'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M35.3335 7.33301H8.66683C7.93045 7.33301 7.3335 7.92996 7.3335 8.66634V35.333C7.3335 36.0694 7.93045 36.6663 8.66683 36.6663H35.3335C36.0699 36.6663 36.6668 36.0694 36.6668 35.333V8.66634C36.6668 7.92996 36.0699 7.33301 35.3335 7.33301Z'
        stroke='black'
        strokeWidth='2.4375'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.9998 7.33301V36.6663'
        stroke='black'
        strokeWidth='2.4375'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

NotebookIcon.defaultProps = { width: 32, height: 32, color: 'black' }

export default NotebookIcon
