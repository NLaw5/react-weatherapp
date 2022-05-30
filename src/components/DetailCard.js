import moment from 'moment'; //used npm install moment --> it bascially formats the date easily
import React from 'react'

function DetailCard({weather_icon, data}) {

    //Can grab the three variables from data.list instead of doing {data.list[0].main}, can deconstruct it 
    const{clouds, main, weather} = data.list[0];

    //note tracking-widest is the letter spacing from tailwind.css
    return (
        <div className="container p-4 flex items-center justify-center shadow-lg roundedfd-lg bg-white h-1/3 mb-auto">
            <div className="my-auto">
                <p className="font-bold text-5xl text-pink-800">{Math.round(main.temp)}&deg;C</p>
                <p className="text-4xl text-gray-800 tracking-widest">
                    {weather[0].main}
                    <img src={weather_icon} className="w-1/4 inline"></img>
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{weather[0].description}</p>
                <p className="tracking-wider">{moment().format('dddd MMM Do YYYY')}</p>
            </div>
            <div className="my-2 border-l-2 border-gray-100 p-2">
                <p className="text-gray-400 text-lg">RealFeel: {Math.round(main.feel_like)}&deg;C</p>
                <p className="text-gray-400 text-lg">Humidity: {main.humidity}%</p>
                <p className="text-gray-400 text-lg">Cloud Cover: {clouds.all}%</p>
                <p className="text-gray-400 text-lg">Min Temp: {Math.round(main.temp_min)}&deg;C</p>
                <p className="text-gray-400 text-lg">Max Temp: {Math.round(main.temp_max)}&deg;C</p>
            </div>
        </div>
        
    )
}

export default DetailCard