import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function CalendarIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">            
      <path d="M14 1V5M6 1V5M1 9H19M3 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H3C1.89543 21 1 20.1046 1 19V5C1 3.89543 1.89543 3 3 3Z" stroke={`${color || 'black'}`}/>
    </svg>
  )
} 