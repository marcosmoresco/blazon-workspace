import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function CaretDownIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">      
      <path d="M26 12L16 22L6 12" stroke={`${color || 'black'}`}/>
    </svg>
  )
} 