import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function ArrowsOutIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">      
      <path d="M21 6H26V11" stroke={`${color || 'black'}`}/>
      <path d="M19 13L26 6" stroke={`${color || 'black'}`}/>
      <path d="M11 26H6V21" stroke={`${color || 'black'}`}/>
      <path d="M13 19L6 26" stroke={`${color || 'black'}`}/>
      <path d="M26 21V26H21" stroke={`${color || 'black'}`}/>
      <path d="M19 19L26 26" stroke={`${color || 'black'}`}/>
      <path d="M6 11V6H11" stroke={`${color || 'black'}`}/>
      <path d="M13 13L6 6" stroke={`${color || 'black'}`}/>
    </svg>
  )
} 