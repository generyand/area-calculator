import React, { useState, useRef, useEffect } from 'react'

const UnitSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const units = [
    { value: 'cm', label: 'Centimeters' },
    { value: 'm', label: 'Meters' },
    { value: 'in', label: 'Inches' },
    { value: 'ft', label: 'Feet' }
  ]

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
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`flex items-center justify-between w-full p-3 bg-white border rounded-xl cursor-pointer transition-colors duration-200
          ${isOpen 
            ? 'border-indigo-500 ring-1 ring-indigo-100' 
            : 'border-gray-200 hover:border-gray-300'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 text-sm">{units.find(u => u.value === value)?.label || 'Select unit'}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl">
          {units.map((unit) => (
            <div
              key={unit.value}
              className={`p-3 cursor-pointer text-sm transition-colors duration-200
                ${value === unit.value 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'hover:bg-gray-50 text-gray-700'}`}
              onClick={() => {
                onChange(unit.value)
                setIsOpen(false)
              }}
            >
              {unit.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UnitSelect 