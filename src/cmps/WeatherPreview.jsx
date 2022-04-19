
import { useState, useEffect } from 'react';

import { ForecastDetails } from './ForecastDetails'
import { weatherService } from '../services/weather-service'

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


export function WeatherPreview({ dailyForecasts }) {

    const [isFav, setIsFav] = useState(null)    
    const [isCelsius, setIsCelsius] = useState(true) 

    
    useEffect(() => {
        setIsFav(dailyForecasts?.favorite)
    }, [dailyForecasts]);    
    
    const toggleFavorite = () => {
        
       const newForecast =  weatherService.handleForcastFavorite(dailyForecasts)
        setIsFav(newForecast.favorite)
    }

    if (!dailyForecasts) return <div className="searchMsg">Our weather app is connected to the biggest and fastest Databases that the blue planet has to offer. try searching any city you like!</div>

    return (
        <section className="weather-preview flex-column-center" >
            {dailyForecasts && <h2 className="flex-row-center">{dailyForecasts.city}, {dailyForecasts.country}</h2>}
            <button onClick={toggleFavorite} className="favorite-btn">{(isFav) ? <AiFillHeart /> : <AiOutlineHeart />}</button>
            <button onClick={()=>setIsCelsius(!isCelsius)} className="btn-1">{isCelsius?"View in ℉ " : "View in ℃"}</button>
            <div className="weather-preview-container flex-row-center" >
                {dailyForecasts.forecasts.map((forecast, idx) => <ForecastDetails key={idx} forecast={forecast} isCelsius={isCelsius} />)}
            </div>
            <div></div>
        </section>
    )
}