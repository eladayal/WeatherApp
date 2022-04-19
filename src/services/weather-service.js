import Axios from 'axios'

import { storageService } from './storage-service'
import { utilService } from '../services/util-service'

export const weatherService = {
    get5DaysWeather,
    searchLocation,
    handleForcastFavorite,
    queryFavs,
}

const WEATHER_API = 'skAUxeXgDaV8UOHMUZXtzjqOg1XUaryf'
const STORAGE_KEY = 'weatherDB'

var gForecasts = _loadFromStorage(STORAGE_KEY) || []


function queryFavs() {
    const favorites = _loadFromStorage(STORAGE_KEY) || [];
    const favForecasts = favorites.filter(forecast => forecast.favorite)
    return favForecasts
}


async function searchLocation(searchParams) {

    if (!searchParams) return
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${WEATHER_API}&q=${searchParams}`

    const res = await Axios.get(url)
    const locationsData = res.data.slice(0, 5)
    const city = locationsData.map(location => {

        return {
            country: location.Country.LocalizedName,
            city: location.LocalizedName,
            key: +location.Key
        }
    })
    return city
}


async function get5DaysWeather(city) {
    if (!city) {
        city = gForecasts[0]
    }

    const forecasts = gForecasts.find(forecast => forecast.key === city.key)
    if (forecasts) {
        console.log('From cache');
        return forecasts

    } else {
        console.log('From axios');
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${WEATHER_API}&metric=true`
        const forecasts = await Axios.get(url)

console.log('forecasts:', forecasts);


        const newForecast = {
            ...city,
            favorite: false,
            headline:forecasts.data.Headline.Text,
            forecasts:
                forecasts.data.DailyForecasts.map(forecast => {
                    return {
                        date: forecast.EpochDate,
                        temperature: {
                            celsius: { min: forecast.Temperature.Minimum.Value, max: forecast.Temperature.Minimum.Value },
                            fahrenheit: { min: utilService.celsiusToFahrenheit(forecast.Temperature.Minimum.Value), max: utilService.celsiusToFahrenheit(forecast.Temperature.Minimum.Value) }
                        },
                        iconNum: forecast.Day.Icon,
                        desc: forecast.Day.IconPhrase,
                        link: forecast.Link,
                    }
                })
        }

        gForecasts.push(newForecast)
        _saveWeatherToStorage(gForecasts)
        return newForecast
    }
}


function handleForcastFavorite(forecast) {
    console.log('forecast:', forecast);
    forecast.favorite = !forecast.favorite
    const forecastIdx = gForecasts.findIndex(data => data.key === forecast.key)
    console.log('forecastIdx:', forecastIdx);
    gForecasts.splice(forecastIdx, 1, forecast)
    _saveWeatherToStorage(gForecasts)
    return forecast

}


function _saveWeatherToStorage(res) {
    storageService.saveToStorage(STORAGE_KEY, res)
}


function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}