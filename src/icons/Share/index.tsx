import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function ShareIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">      
      <path d="M22 19L28 13L22 7" stroke={`${color || 'black'}`} />
      <path d="M24 27H5C4.73478 27 4.48043 26.8946 4.29289 26.7071C4.10536 26.5196 4 26.2652 4 26V11" stroke={`${color || 'black'}`} />
      <path d="M9.37805 22C10.0441 19.424 11.5469 17.1423 13.6505 15.5133C15.7542 13.8843 18.3394 13.0002 21 13H28" stroke={`${color || 'black'}`} />
    </svg>
  )
} 