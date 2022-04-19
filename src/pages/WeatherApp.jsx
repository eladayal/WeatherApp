import React from 'react';

import { weatherService } from '../services/weather-service'
import { WeatherPreview } from '../cmps/WeatherPreview'
import { SearchBar } from '../cmps/SearchBar'

export class WeatherApp extends React.Component {

    state = {
        dailyForecasts: null,
    }

    componentDidMount() {
        this.getWeather()
    }

    getWeather = async (city) => {
        try {
            let dailyForecasts = await weatherService.get5DaysWeather(city)
            this.setState({ dailyForecasts })
        } catch (error) {
            console.log('Couldnt stand the weather:', error);
        }
    }


    render() {
        const { dailyForecasts } = this.state

        return (
            <section className="home-page flex-column-center" >
                <SearchBar getWeather={this.getWeather} />

                <WeatherPreview dailyForecasts={dailyForecasts} />

            </section >
        )
    }
}

