import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import userAuthContext from './context/UserAuthContext';
import WelcomeMessage from './components/WelcomeMessage';
import './App.css'
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import {  WEATHER_API_URL, WEATHER_API_KEY, geoApiOptions } from './api';
import { Alert } from 'react-bootstrap';
import ForecastWeather from './components/forecast/ForecastWeather';



function App() {

  useEffect( () => {

    const data = localStorage.getItem('currentWeather');
    setCurrentWeather(JSON.parse(data))

  },[] )


  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const navigate = useNavigate();
  const {user, logOut} = useContext(userAuthContext);

  useEffect( () => {
    if(!user) {
      navigate('signin');
    } 
  },[] )

  const handleLogOut = async() => {
    try{
      logOut();
    }catch(err) {
      console.log(err.message);
    }}


    const handleOnSearchChange = (searchData) => {

      console.log(searchData);
      
      const [lat, lon] = searchData.value.split(' ');

      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);


      Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });

        const data = JSON.stringify(currentWeather)

      localStorage.setItem('currentWeather', data );

      })
      .catch(console.log);

    };

    
    let errMessage = null;


    async function showPosition(position) {

      const lat = position.coords.latitude;
      const lon =  position.coords.longitude;
      console.log(lat,lon)

      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

      Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        console.log(weatherResponse, forcastResponse);
        setCurrentWeather( weatherResponse );
        setForecast(forcastResponse );

        const data = JSON.stringify(currentWeather)

      localStorage.setItem('currentWeather', data );

      })
      .catch(console.log);


    }


    function handleCurrentLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( showPosition );
      } else { 
        errMessage='Geo location is not supported by the browser'
      }
    }

    // console.log(currentWeather,'currentWeather');
    // console.log(forecast,'forecast')

  return ( <>

  <div className='mainContainer' >
  <div className='container' >

    <div className={`header`} >
      <WelcomeMessage/>
    </div>
    
    <div>
      <Search onSearchChange={handleOnSearchChange} />

    <div className='locationDiv' >
      <span> or </span>

      <button className='link' onClick={handleCurrentLocation} type='button' > Get current location </button>
      </div>

    { errMessage && <Alert> Geolocation is not supported by the browser </Alert> }

    </div>

    
    <div className='weatherContainer'>
      { currentWeather && <CurrentWeather data={currentWeather}  /> }
    </div>

    <div className='forecastContainer' >
      { forecast && <ForecastWeather data={forecast}  /> }
    </div>
    

    <button type='button' className='secondary' onClick={ handleLogOut } > LogOut </button>

  </div>
  
  </div>
  </>
  )
}

export default App
