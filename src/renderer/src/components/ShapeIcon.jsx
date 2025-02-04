import React from 'react'

const ShapeIcon = ({ shape, className = "" }) => {
  const iconClass = `transition-colors duration-200 ${className}`
  
  switch (shape) {
    case 'square':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      )
    case 'rectangle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
        </svg>
      )
    case 'circle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
    case 'triangle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
          <path d="M3 20h18L12 4z" />
        </svg>
      )
    case 'trapezoid':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
          <path d="M4 18L8 6h8l4 12H4z" />
        </svg>
      )
    case 'ellipse':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClass}>
          <ellipse cx="12" cy="12" rx="10" ry="6" />
        </svg>
      )
    default:
      return null
  }
}

export default ShapeIcon 