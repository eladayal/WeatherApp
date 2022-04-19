import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Favorites } from "./pages/Favorites.jsx"
import { WeatherApp } from './pages/WeatherApp.jsx'
import { AppHeader } from './cmps/AppHeader.jsx';

export function RootCmp () {

    
        return (
            <div>
                <AppHeader />
                <main >
                    <Switch>

                        <Route component={Favorites} path="/favorite" />
                        <Route component={WeatherApp} path="/" />

                    </Switch>
                </main>

            </div>
        )
    
}

