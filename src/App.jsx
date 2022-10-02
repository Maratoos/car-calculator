import React, { useState } from 'react'
import '../css/App.css'
import "../css/media.css"
import { Button } from './components/Button/Button'
import { InputSlider } from './components/InputSlider/InputSlider'

function App() {
const [price, setPrice] = useState(1000000)
const [contribution, setContribution] = useState(10)
const [month, setMonth] = useState(1)
//Эти стейты передаются в компонент InputSlider, чтобы там их заполнить и получить здесь, эмит на минималках
const [error, setError] = useState(null)
const [isDisabled, setIsDisabled] = useState(false) //Этот стейт, чтобы добавлять к инпутам и кнопке состояние disabled

const initialFee = (price / 100) * contribution //первоначальный взнос
const monthPay = (price - initialFee) * ((0.035 * Math.pow((1 + 0.035), month)) / (Math.pow((1 + 0.035), month) - 1)); //месячная оплата
const lease = (monthPay * month) * 3.5 //сам лизинг, здесь я немного поменял формулу, ибо используя формулу данную в анкете выходили заоблачные суммы

const createTransaction = async (e) => {
  e.preventDefault();
  setError("так как проект выложен на firebase функция не отработает должным образом и придется перезагрузить сайт")
  setIsDisabled(true) //устанавливается disabled для кнопки и инпутов

  const newTransaction = {
    price: price,
    initialFee: initialFee,
    month: month,
    lease: lease,
    monthPay: monthPay
  }
  // собираю все данные в один обьект

  await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      headers: {'Content-type': 'application/json'}
  }) //здесь он отправляется в мой локальный файл json
  setError(null)
  setIsDisabled(false) //кнопка и инпуты переходят в обычное состояние
} //так как проект выложен на firebase функция не отработает должным образом и придется перезгрузить сайт

  return (
    <div className="container">
      <div className="calc">
        <div className="calc__header">
          <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
          {error && <span>{error}</span>}
        </div>
        <div className="calc__content"> 
          {/* тут передается много пропсов, для того чтобы с их помощью можно было создавать разные инпуты */}
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
            <p>{lease.toFixed(0)} ₽</p> {/* здесь после запятой не будет цифр */}
          </div>
          <div className="calc__footer-item">
            <h4>Ежемесячный платеж от</h4>
            <p>{monthPay.toFixed(0)} ₽</p> {/* здесь после запятой не будет цифр */}
          </div>
          <div className="calc__footer-item">
            <Button onClick={createTransaction} disabled={isDisabled} title="Оставить заявку" /> {/* тут почти теже пропсы что и сверху, но можно и расширить чтобы задавать ширину высоту и тп */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
