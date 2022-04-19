import { useState, useEffect } from 'react';

import { utilService } from '../services/util-service'

import { HiOutlineInformationCircle } from 'react-icons/hi';

export function ForecastDetails({ forecast, isCelsius = true }) {

    const { date, desc, iconNum, link, temperature: { celsius, fahrenheit } } = forecast

    if (!forecast) return <div>Loading</div>
    return (
        <div className="forecast-details">
            <img src={`https://www.accuweather.com/images/weathericons/${iconNum}.svg`} alt="" />
            <div className="date">{utilService.getDate(date)} <br /> {utilService.getDay(date)}</div>
            <div className="desc">{desc}</div>
            <div className="forecast-temp">
                {isCelsius && <div>{celsius.min}&#8451; - <span>{celsius.max}&#8451;</span> </div>}
                {!isCelsius && <div>{fahrenheit.min}&#8457; - <span>{fahrenheit.max}&#8457;</span> </div>}
            </div>
            <a className="link" target="_blank" href={link}><HiOutlineInformationCircle/>Read more</a>

        </div>
    )

}