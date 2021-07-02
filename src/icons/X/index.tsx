import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function XIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 7L7 25" stroke={`${color || 'black'}`}/>
      <path d="M25 25L7 7" stroke={`${color || 'black'}`}/>
    </svg>
  )
} 