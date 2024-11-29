import styles from './WelcomeMessage.module.css';

const WelcomeMessage = () => {

  return  <div className={`${styles.container}`} >  
    <img className={`${styles.image}`} src={`icons/01d.png`} />
    <h1 className={`${styles.heading}`} > Welcome to Weather Forecast </h1>
  </div>
}

export default WelcomeMessage;