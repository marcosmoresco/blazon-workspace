import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function ArticleIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">      
      <path d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z" stroke={`${color || 'black'}`} />
      <path d="M9.5 12H22.5" stroke={`${color || 'black'}`} />
      <path d="M9.5 16H22.5" stroke={`${color || 'black'}`} />
      <path d="M9.5 20H22.5" stroke={`${color || 'black'}`} />
    </svg>
  )
}