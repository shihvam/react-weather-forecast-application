import styles from './CurrentWeather.module.css';

const CurrentWeather = ({data}) => {


  return (
    <>
    <div className={`${styles.weather}`} >

      <div className={`${styles.topcontainer}`} >

          <div className={`${styles.top}`} >
            <p className={`${styles.city}`} > {data?.city || data?.name} </p>
            <p className={`${styles.weatherdescription}`} > {data?.weather[0]?.description || 'description'} </p>
          </div>

          <div>
          <img alt='weather' className={`${styles.weatherIcon}`} src={`icons/${data?.weather[0].icon}.png` || `icons/01d.png`}  />
          </div>

      </div>

      <div className={`${styles.bottomcontainer}`} >

        <p className={`${styles.temperature}`} > { Math.round(data?.main?.temp) || 'temperature' }°C  </p>

        <div className={`${styles.details}`} >

          <div className={`${styles.parameterRow}`} >
            <span className={`${styles.parameterLabel} ${styles.border}  `} > Details  </span>
          </div>

          <div className={`${styles.parameterRow}`} >
            <span className={`${styles.parameterLabel}`} > Feels like  </span>
            <span className={`${styles.parameterValue}`} >  {Math.round(data?.main?.feels_like) || 'Feels like'  }°C </span>
          </div>

          <div className={`${styles.parameterRow}`} >
            <span className={`${styles.parameterLabel}`} > Wind  </span>
            <span className={`${styles.parameterValue}`} >  {data?.wind?.speed || 'speed'  }m/s </span>
          </div>

          <div className={`${styles.parameterRow}`} >
            <span className={`${styles.parameterLabel}`} > Humiditty  </span>
            <span className={`${styles.parameterValue}`} >  {data?.main?.humidity || 'humidity' }% </span>
          </div>

          <div className={`${styles.parameterRow}`} >
            <span className={`${styles.parameterLabel}`} > Pressure  </span>
            <span className={`${styles.parameterValue}`} >  {data?.main?.pressure || 'pressure'  }hPa </span>
          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default CurrentWeather;