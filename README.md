# React Weather App
You can check out the application [here](https://react-weatherapp-pink.vercel.app/)!

## Description
This application uses an open API called WeatherAPI to fetch realtime weather data to the user. This React application uses Tailwind CSS for its design. We request the GET route for the specific api using fetch(), and this api will return back a 5 day forecast for any location on the globe. 

The default location for the application is Toronto; however, if the user clicks the geolocation icon next to the search bar, the browser can determine the weather at their location using **navigator.geolocation.getCurrentPosition(myIP)**. If curious, check out App.js to see how the functionality works!

User can also search up any location in the world and the app will display the weather forecast. Happy hacking!
