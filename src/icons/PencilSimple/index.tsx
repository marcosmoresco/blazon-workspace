import React from 'react'

export type IconProps = {
  width?: number
  height?: number
  color?: string
  stroke?: number
}

function PencilSimpleIcon(props: IconProps) {
  const { width, height, color, stroke } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d="M12 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V20.4142C5 20.2829 5.02587 20.1529 5.07612 20.0315C5.12638 19.9102 5.20004 19.8 5.29289 19.7071L20.2929 4.70711C20.4804 4.51957 20.7348 4.41422 21 4.41422C21.2652 4.41422 21.5196 4.51957 21.7071 4.70711L27.2929 10.2929C27.4804 10.4804 27.5858 10.7348 27.5858 11C27.5858 11.2652 27.4804 11.5196 27.2929 11.7071L12 27Z" stroke={color} strokeWidth={stroke}/>
      <path d="M17 8L24 15" stroke={color} strokeWidth={stroke}/>     
    </svg>
  )
}

PencilSimpleIcon.defaultProps = { width: 32, height: 32, color: 'black', stroke: 1 }

export default PencilSimpleIcon