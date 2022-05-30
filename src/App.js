import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DetailCard from './components/DetailCard';
import SummaryCard from './components/SummaryCard';

function App() {

  const API_KEY = process.env.REACT_APP_API_KEY
  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [City, setCity] = useState('Unknown location')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@ex.png`)

  //Apply custom styling:
  const [divStyle, setDivStyle] = useState('100vh')

  const handleSubmit = (e) => {

    console.log(searchTerm)
    //Prevent browser refresh
    e.preventDefault()
    //Pass through our query
    getWeather(searchTerm)
  }
  
  //Any time the user types in the input, it will call this handleChange to update our state variable "searchTerm"
  const handleChange = (userInput) => {

    //Deconstruct value from userInput object
    const {value} = userInput.target;
    //Use our useState function to hook the value onto our searchTerm value
    setSearchTerm(value)
  }

  const myIP = location => {
    console.log(location)

    //deconstruct location
    const {latitude, longitude} = location.coords;
    getWeather([latitude, longitude])
  }

  //our async function to make API call
  const getWeather = async(userLocation) =>{

    //Set our weather data variable to an empty array again
    setWeatherData([])

    //Determine if we are searching from user Search or from the search button

    //if it's a string, our query is using a string, its location vs. if its not its a long and lat coordination
    //This decides the type of query we're sending to our query
    let how_to_search = (typeof userLocation === 'string') ? `q=${userLocation}` : `lat=${userLocation[0]}&lon=${userLocation[1]}` 
    console.log(how_to_search)
    //Obviously because its api call, we are using try and catch for the get route
    try 
    {
    
      let res = await fetch(`${process.env.REACT_APP_URL+how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly`)
      let data = await res.json()

      if(data.cod != 200) // if status code does not equal 200
      {
        setNoData('Location Not Found')
        setDivStyle('100vh')
        return
      }
      else
      {
        setDivStyle('100%')
        console.log(divStyle)
        setWeatherData(data)
        setCity(`${data.city.name}, ${data.city.country}`)
        setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]['icon']}@4x.png`)

      }
    }
    catch (err)
    {
      console.log(err)
      alert("Error occurred " + err)
    }
  }

  useEffect(() => {
    console.log("In use Effect")

    getWeather('Toronto')
  }, [])
  

  return (
    <div className="bg-gray-800 flex items-center justify-center w-screen h-screen py-10" style={{height: divStyle}}>
      <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        {/* form card section */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 rounded--md bg-white bg-opacity-30"
              style={{borderRadius:"10px"}}
            >
              forecast
            </h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
              <i className="fa fa-map my-auto" aria--hidden="true">
              </i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">
                  {City}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl">The Only Weather Forecast You Need</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input type="text" 
                placeholder="Enter location" 
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange} 
                required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3" 
                  aria-hidden="true" type="submit"></i>
                </button>
              <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                navigator.geolocation.getCurrentPosition(myIP)
              }}></i>
            </form>
          </div>
        </div>

        {/* info card section */}
        <div className="w-2/4 p-5">
          <Header />
          <div className="flex flex-col my-10">
            {weatherData.length === 0 ? 
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl font-bold uppercase">{noData}</h1>
              </div> : 
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-4">
                  Today
                </h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-3xl text-gray-600 mb-4 mt-10">More On {City}</h1>
                <ul className="grid grid-cols-2 gap-2">
                  {weatherData.list.map((days, index) => {
                    if(index > 0){
                      return(<SummaryCard key={index} day={days}/>)
                    }
                  })}
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
