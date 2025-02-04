import React, { useState } from 'react'
import CustomSelect from './components/CustomSelect'
import UnitSelect from './components/UnitSelect'

const formatNumber = (num) => {
  // Convert to string with up to 2 decimal places
  const formatted = Number(num).toFixed(2)
  // Remove trailing zeros after decimal point
  return formatted.replace(/\.?0+$/, '')
}

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

  const shapeOptions = Object.entries(shapes).map(([key, { label }]) => ({
    value: key,
    label: label
  }))

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