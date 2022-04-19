import { useState, useEffect } from 'react';
import { debounce } from 'lodash'

import { weatherService } from '../services/weather-service'

export function SearchBar({ getWeather }) {

    const [citiesList, setCitiesList] = useState(null)
    const [search, setSearch] = useState('')
    const [isListOpen, setListOpen] = useState(false)

    useEffect(() => {
        onSearchLocation()

    }, [search]);

    const updateSearch = (ev) => setSearch(ev?.target?.value)

    const debounceTxt = debounce(updateSearch, 1500)

    const onSearchLocation = async () => {
        const List = await weatherService.searchLocation(search)
        setCitiesList(List)
        setListOpen(true)
    }

    return (
        <section className=" search-bar flex-column-center">
            <div>
                <input
                    className="input-style"
                    type="text"
                    placeholder="Search a city to see what's the weather's like"
                    list="city-list"
                    // value={search}
                    onChange={debounceTxt}
                />
            </div>

            {isListOpen && <div className="search-list-container">
                {citiesList && citiesList.map(city => {
                    return <div key={city.key}
                        className="search-list flex-column-center"
                        onClick={() => {getWeather(city);setListOpen(false);setSearch('') }}>
                        {city.city},{city.country}
                    </div>
                })}
            </div>}
        </section>
    )

}

