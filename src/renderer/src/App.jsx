import React, { useState, useRef, useEffect } from 'react'
import './assets/main.css'

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
    <div className="custom-select" ref={dropdownRef}>
      <div 
        className={`select-selected ${isOpen ? 'open' : ''} ${value ? 'has-value' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? options.find(opt => opt.value === value)?.label : 'Choose a shape'}
        <span className="select-arrow"></span>
      </div>
      {isOpen && (
        <div className="select-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
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

const App = () => {
  const [selectedShape, setSelectedShape] = useState('')
  const [dimensions, setDimensions] = useState({})
  const [result, setResult] = useState(null)

  const shapes = {
    square: { label: 'Square', fields: ['side'] },
    rectangle: { label: 'Rectangle', fields: ['length', 'width'] },
    circle: { label: 'Circle', fields: ['radius'] },
    triangle: { label: 'Triangle', fields: ['base', 'height'] },
    trapezoid: { label: 'Trapezoid', fields: ['base1', 'base2', 'height'] },
    ellipse: { label: 'Ellipse', fields: ['radius1', 'radius2'] }
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

  const handleInputChange = (field, value) => {
    setDimensions(prev => ({ ...prev, [field]: value }))
  }

  const shapeOptions = Object.entries(shapes).map(([key, { label }]) => ({
    value: key,
    label: label
  }))

  return (
    <div className="container">
      <h1>Shape Area Calculator</h1>
      
      <div className="shape-selector">
        <label>Select Shape:</label>
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

      {selectedShape && (
        <div className="input-fields">
          {shapes[selectedShape].fields.map(field => (
            <div key={field} className="input-group">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="number"
                value={dimensions[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter ${field} measurement`}
                min="0"
                step="any"
              />
              <small>Enter the {field} in your preferred units</small>
            </div>
          ))}
          <button 
            onClick={calculateArea} 
            className="calculate-btn"
            disabled={!Object.values(dimensions).every(val => val > 0)}
          >
            Calculate Area
          </button>
        </div>
      )}

      {result !== null && (
        <div className="result">
          <h2>Area: {formatNumber(result)} square units</h2>
        </div>
      )}
    </div>
  )
}

export default App