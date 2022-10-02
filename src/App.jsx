import React, { useState } from 'react'
import '../css/App.css'
import "../css/media.css"
import { Button } from './components/Button/Button'
import { InputSlider } from './components/InputSlider/InputSlider'

function App() {
const [price, setPrice] = useState(1000000)
const [contribution, setContribution] = useState(10)
const [month, setMonth] = useState(1)
const [isDisabled, setIsDisabled] = useState(false)

const initialFee = (price / 100) * contribution
const monthPay = (price - initialFee) * ((0.035 * Math.pow((1 + 0.035), month)) / (Math.pow((1 + 0.035), month) - 1));
const lease = (monthPay * month) * 3.5

const createTransaction = async (e) => {
  e.preventDefault();
  setIsDisabled(true)

  const newTransaction = {
    price: price,
    initialFee: initialFee,
    month: month,
    lease: lease,
    monthPay: monthPay
  }

  await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      headers: {'Content-type': 'application/json'}
  })
  setIsDisabled(false)
}

  return (
    <div className="container">
      <div className="calc">
        <div className="calc__header">
          <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
        </div>
        <div className="calc__content">
          <InputSlider 
            min={1000000} 
            max={6000000} 
            title="Стоимость автомобиля" 
            setState={setPrice} 
            value={price} 
            inputRight="₽"
            percent={false}
            disabled={isDisabled}
          />
          <InputSlider 
            min={10} 
            max={60} 
            title="Первоначальный взнос" 
            setState={setContribution} 
            value={contribution} 
            inputRight={`${initialFee.toFixed(0)}₽`}
            percent={true}
            disabled={isDisabled}
          />
          <InputSlider 
            min={1} 
            max={60} 
            title="Срок лизинга" 
            setState={setMonth} 
            value={month} 
            inputRight="мес."
            percent={false}
            disabled={isDisabled}
          />
        </div>
        <div className="calc__footer">
          <div className="calc__footer-item">
            <h4>Сумма договора лизинга</h4>
            <p>{lease.toFixed(0)} ₽</p>
          </div>
          <div className="calc__footer-item">
            <h4>Ежемесячный платеж от</h4>
            <p>{monthPay.toFixed(0)} ₽</p>
          </div>
          <div className="calc__footer-item">
            <Button onClick={createTransaction} disabled={isDisabled} title="Оставить заявку" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
