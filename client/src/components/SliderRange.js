import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function valuetext(value) {
  return `${value}°C`;
}

const RangeSlider = ({max, step, setRange}) => {
  const [value, setValue] = useState([0, max]);
    
  const handleChange = (event, newValue) => { 
    setRange(newValue)
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 600 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={max}
        step={step}
      />
    </Box>
  );
}
export default RangeSlider
