import { useState, useEffect } from 'react';

import { weatherService } from '../services/weather-service'
import { ForecastDetails } from '../cmps/ForecastDetails';

import {TiDeleteOutline } from 'react-icons/ti';

export function Favorites() {

    const [forecasts, setForecasts] = useState(null)

    useEffect(() => {
        loadFavForecasts()

    }, [forecasts]);


    async function loadFavForecasts() {
        let favForecasts = await weatherService.queryFavs()
        setForecasts(favForecasts)
    }

    const toggleFavorite = (forecast) => {
        weatherService.handleForcastFavorite(forecast)
     }


    if (!forecasts) return <></>
    return (
        <section className="favorite flex-column-center" >
            <h1>Favorites</h1>

            {forecasts.map(forecast => {
                return <>  <h2 className="fav-title flex-row-center">{forecast.city}, {forecast.country}</h2>
                    <div className="forecast-container flex-row-center">
                        {console.log('forecast:', forecast)}
                        <button onClick={()=>toggleFavorite(forecast)} className="remove-favorite" title="Remove from favorites"><TiDeleteOutline /></button>

                        {forecast.forecasts.map(forecastData => <ForecastDetails forecast={forecastData} />)}
                    </div>

                </>
            })}
        </section>
    )
}