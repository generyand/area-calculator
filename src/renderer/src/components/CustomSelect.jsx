import React, { useState, useRef, useEffect } from 'react'
import ShapeIcon from './ShapeIcon'

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className={`flex items-center justify-between w-full p-4 bg-white border rounded-xl cursor-pointer transition-colors duration-200
          ${isOpen 
            ? 'border-indigo-500 ring-1 ring-indigo-100' 
            : 'border-gray-200 hover:border-gray-300'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <div className="flex items-center space-x-3">
            <ShapeIcon shape={value} className="text-indigo-600 w-6 h-6" />
            <span className="text-gray-700 font-medium">{options.find(opt => opt.value === value)?.label}</span>
          </div>
        ) : (
          <span className="text-gray-400 font-medium">Choose a shape</span>
        )}
        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-4 cursor-pointer transition-colors duration-200
                ${value === option.value 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'hover:bg-gray-50 text-gray-700'}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              <ShapeIcon shape={option.value} className={value === option.value ? 'text-indigo-600' : 'text-gray-400'} />
              <span className="font-medium">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect 