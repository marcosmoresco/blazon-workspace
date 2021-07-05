import React from 'react'

export type IconProps = { 
  width?: number,
  height?: number,
  color?: string  
}

export default function UserGearIcon(props:IconProps) {

  const { width, height ,color } = props
  
  return (
    <svg width={`${width || 32}`} height={`${height || 32}`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">                
      <path d="M25 9C26.1046 9 27 8.10457 27 7C27 5.89543 26.1046 5 25 5C23.8954 5 23 5.89543 23 7C23 8.10457 23.8954 9 25 9Z" stroke={`${color || 'black'}`} />
      <path d="M25 5V3.5" stroke={`${color || 'black'}`} />
      <path d="M23.268 6L21.9689 5.25" stroke={`${color || 'black'}`} />
      <path d="M23.268 8L21.9689 8.75" stroke={`${color || 'black'}`} />
      <path d="M25 9V10.5" stroke={`${color || 'black'}`} />
      <path d="M26.7321 8L28.0311 8.75" stroke={`${color || 'black'}`} />
      <path d="M26.7321 6L28.0311 5.25" stroke={`${color || 'black'}`} />
      <path d="M3.87363 26.9988C5.10308 24.8708 6.87089 23.1037 8.99948 21.8752C11.1281 20.6467 13.5425 20 16.0001 20C18.4578 20 20.8722 20.6468 23.0008 21.8754C25.1293 23.1039 26.8971 24.871 28.1265 26.9991" stroke={`${color || 'black'}`} />
      <path d="M23.3284 15.2137C22.7299 16.5757 21.7633 17.7438 20.5373 18.5865C19.3113 19.4293 17.8745 19.9133 16.3885 19.9842C14.9024 20.0551 13.4261 19.7101 12.1254 18.9879C10.8248 18.2657 9.75136 17.195 9.02589 15.8961C8.30043 14.5973 7.95167 13.1218 8.01884 11.6356C8.08601 10.1494 8.56644 8.71142 9.40611 7.48331C10.2458 6.2552 11.4114 5.28568 12.7719 4.68375C14.1324 4.08183 15.6339 3.87136 17.1074 4.07603" stroke={`${color || 'black'}`} />
    </svg>
  )
}