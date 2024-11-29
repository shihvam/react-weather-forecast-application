import styles from './ForecastWeather.module.css';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';


const ForecastWeather = ({ data }) => {

  const WEEK_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  const dayInAWeek = new Date().getDay();

  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length ).concat(WEEK_DAYS.slice(0, dayInAWeek));

  console.log(forecastDays);

  console.log(data);

  return (
    <>

      <label className={`${styles.title}`} > Daily </label>
      <Accordion allowZeroExpanded >
      { data.list.splice(0,7).map( (item, idx) => (
          <AccordionItem key={idx} >
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className={`${styles.dailyItem}`} >
                  <img alt='weather' className={`${styles.iconSmall}`}  src={`icons/${item.weather[0].icon}.png`} />
                  <label className={`${styles.day}`}> {forecastDays[idx]} </label>
                  <label className={`${styles.description}`} > {item.weather[0].description} </label>
                  <label className={`${styles.minmax}`} > {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel> 
              <div className={`${styles.dailydetailsgrid}`} >

                <div className={`${styles.dailydetailsgriditem}`}>  
                  <label> Pressure </label>
                  <label> {item?.main?.pressure}hPa </label>
                </div>

                <div className={`${styles.dailydetailsgriditem}`}>  
                  <label> Humidity </label>
                  <label> {item?.main?.humidity}% </label>
                </div>

                <div className={`${styles.dailydetailsgriditem}`}>  
                  <label> Clouds </label>
                  <label> {item.clouds.all}% </label>
                </div>

                <div className={`${styles.dailydetailsgriditem}`}>  
                  <label> Speed </label>
                  <label> {item.wind.speed}m/s </label>
                </div>

                <div className={`${styles.dailydetailsgriditem}`}>  
                  <label> Sea level </label>
                  <label> {item.main.sea_level}m </label>
                </div>

                <div className={`${styles.dailydetailsgriditem}`}>  
                  <label> Feels like </label>
                  <label> {Math.round(item.main.feels_like)}°C </label>
                </div>

              </div>

            </AccordionItemPanel>
          </AccordionItem>
        ))
        }
      </Accordion>
    </>
  )
}

export default ForecastWeather;