import React, { useEffect, useState } from 'react';
import "../../../css/Slider.css"
import "../../../css/media.css"
import Slider from '@mui/material/Slider';

export const InputSlider = ({ title, min, max, setState, value, inputRight, percent, disabled}) => { //все принимаемые деструктуризированные пропсы

  const handleInputChange = (e) => {
    setState(e.target.value)
  }

  const handleSliderChange = (e, newValue) => {
    setState(newValue)
  }

  const handleBlur = () => { //если пользователь вводит некоректное значение то при клике мышкой вне инпута значение сбросится
    if (value < min) {
      setState(min)
    } else if (value > max) {
      setState(max)
    }
  }

  return (
    <>
    {!percent ? (
     <div className="calc__content-item">
      <p>{title}</p>
      <div className="input-summary">
        <input
          disabled={disabled}
          type="number"
          className='none-percent-input'
          value={value}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        <p className='none-percent-p'>{inputRight}</p>
      </div>
      {/* слайдер был взят из библиотеки MaterialUI */}
      <Slider
        disabled={disabled}
        value={value}
        min={min}
        max={max}
        onChange={handleSliderChange}
        onBlur={handleBlur}
        className="slider"
        size="small"
      />
    </div>
    ) : ( 
      // здесь отрисовывается инпут по пропсу percent тот что в середине
      <div className="calc__content-item">
      <p>{title}</p>
      <div className="input-summary">
        <p className='percent-p'>{inputRight}</p>
         <input
            disabled={disabled}
            type="number"
            className='percent-input'
            value={value}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          <p className='percent-symbol'>%</p>
      </div>
      <Slider
        disabled={disabled}
        value={value}
        min={min}
        max={max}
        onChange={handleSliderChange}
        onBlur={handleBlur}
        className="slider"
        size="small"
      />
    </div>
    )}
    </>
  )
}
