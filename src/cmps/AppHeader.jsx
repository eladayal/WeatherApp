import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'

export class AppHeader extends React.Component {

    state = {
        date:moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }

    componentDidMount() {
        setInterval(this.update, 1000);
    }

    update =()=>{
        this.setState({ date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a" )})
    }

    render() {
        const {date} = this.state
        return (
            <section className="app-header" >
                <div className="app-header-container flex row space-between">
                    <div className="app-date flex-row-center">{date}</div>
                    <div className="header-link-btns flex">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/favorite'}>Favorites</Link>
                    </div>
                </div>


            </section>
        )
    }
}

