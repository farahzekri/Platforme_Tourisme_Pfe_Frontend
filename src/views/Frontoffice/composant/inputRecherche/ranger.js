import { useState } from "react";
import { Range } from "react-range";

export default function PriceRangeSlider({ min, max, value, onChange }) {
  const [values, setValues] = useState(value || [min, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  return (
    <div className="flex flex-col w-full">
      <span className="mb-2">Budget:  {values[1]} TND</span>
      <Range
        step={10}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="relative w-full h-2 bg-gray-300 rounded-full"
          >
            <div className="absolute h-2 bg-palette-bleuclere rounded-full" style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`,
              width: `${((values[1] - values[0]) / (max - min)) * 100}%`
            }} />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-palette-bleuclere rounded-full cursor-pointer shadow-md"
          />
        )}
      />
    </div>
  );
}
