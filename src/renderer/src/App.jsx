import React, { useState, useRef, useEffect } from 'react'

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
        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
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

const formatNumber = (num) => {
  // Convert to string with up to 2 decimal places
  const formatted = Number(num).toFixed(2)
  // Remove trailing zeros after decimal point
  return formatted.replace(/\.?0+$/, '')
}

// Add this style block at the top of your component
const inputStyles = `
  /* Remove spinners for Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove spinners for Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`

const App = () => {
  const [selectedShape, setSelectedShape] = useState('')
  const [dimensions, setDimensions] = useState({})
  const [result, setResult] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState('cm')

  const shapes = {
    square: { label: 'Square', fields: ['side'] },
    rectangle: { label: 'Rectangle', fields: ['length', 'width'] },
    circle: { label: 'Circle', fields: ['radius'] },
    triangle: { label: 'Triangle', fields: ['base', 'height'] },
    trapezoid: { label: 'Trapezoid', fields: ['base1', 'base2', 'height'] },
    ellipse: { label: 'Ellipse', fields: ['radius1', 'radius2'] }
  }

  const isFormValid = () => {
    if (!selectedShape) return false
    
    const requiredFields = shapes[selectedShape].fields
    return requiredFields.every(field => {
      const value = dimensions[field]
      return value !== undefined && 
             value !== '' && 
             !isNaN(value) && 
             Number(value) > 0
    })
  }

  const handleInputChange = (field, value) => {
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDimensions(prev => ({ ...prev, [field]: value }))
    }
  }

  const calculateArea = () => {
    switch (selectedShape) {
      case 'square':
        setResult(dimensions.side ** 2)
        break
      case 'rectangle':
        setResult(dimensions.length * dimensions.width)
        break
      case 'circle':
        setResult(Math.PI * dimensions.radius ** 2)
        break
      case 'triangle':
        setResult(0.5 * dimensions.base * dimensions.height)
        break
      case 'trapezoid':
        setResult(0.5 * (Number(dimensions.base1) + Number(dimensions.base2)) * dimensions.height)
        break
      case 'ellipse':
        setResult(Math.PI * dimensions.radius1 * dimensions.radius2)
        break
      default:
        setResult(null)
    }
  }

  const shapeOptions = Object.entries(shapes).map(([key, { label }]) => ({
    value: key,
    label: label
  }))

  return (
    <>
      <style>{inputStyles}</style>
      <div className="h-screen w-screen overflow-auto bg-gray-100 p-4 sm:p-6">
        <div className="mx-auto max-w-full w-[32rem]">
          <div className="rounded-2xl sm:bg-white sm:border border-gray-200/50 p-4 sm:p-6 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shape Area Calculator</h1>
              <p className="text-sm sm:text-base text-gray-500">Calculate the area of various geometric shapes</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Shape</label>
                <CustomSelect
                  value={selectedShape}
                  onChange={(value) => {
                    setSelectedShape(value)
                    setDimensions({})
                    setResult(null)
                  }}
                  options={shapeOptions}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                <UnitSelect value={selectedUnit} onChange={setSelectedUnit} />
              </div>
            </div>

            {selectedShape && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {shapes[selectedShape].fields.map(field => (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={dimensions[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          placeholder={`Enter ${field}`}
                          className="block w-full rounded-xl bg-white border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm pl-4 pr-12 py-3 transition-colors duration-200 hover:border-gray-300"
                          min="0"
                          step="any"
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                          {selectedUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={calculateArea} 
                  disabled={!isFormValid()}
                  className={`w-full cursor-pointer py-3 px-4 rounded-xl text-sm font-semibold transition-colors duration-200
                    ${isFormValid() 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Calculate Area
                </button>
              </div>
            )}

            {result !== null && (
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100/50">
                <div className="text-center space-y-1">
                  <p className="text-sm text-indigo-600 font-medium">Result</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">
                    {formatNumber(result)} {selectedUnit}²
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App