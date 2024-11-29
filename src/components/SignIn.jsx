import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import WelcomeMessage from './WelcomeMessage';
import { useContext, useState } from 'react';
import userAuthContext from '../context/UserAuthContext';
import { Alert } from 'react-bootstrap';


const SignIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {logIn} = useContext(userAuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{

      await logIn(email, password);

      navigate('/');
  
    }catch(err) {
      setError(err.message);
    }
  }

  return <>

  <div className={`${styles.main} `}>

    <WelcomeMessage/>

    <form className={`${styles.container}`} onSubmit={ (e) => handleSubmit(e) }  >

      <h1 className={`${styles.heading}`} > Welcome back! </h1>
      <p className={`${styles.paragraph}`} > Please login to continue </p>

      {error && <Alert variant='danger' > {error} </Alert>}

      <div className={`${styles.inputContainer}`} >
        <label className={`${styles.label}`} htmlFor='email'> Enter your mail id </label>
        <input className={`${styles.input}`}
        id='email'
        name='email' 
        placeholder='Email id' 
        type='mail'
        value={email}
        onChange={(e) =>  setEmail(e.target.value) } 
        />
      </div>

      <div className={`${styles.inputContainer}`} >
        <label className={`${styles.label}`} htmlFor='password'> Password </label>
        <input className={`${styles.input}`}
        id='password'
        name='password'
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) =>  setPassword(e.target.value) } 
        />
      </div>

      <button type='submit' className={`${styles.primarybutton}`} > Log In </button>

      <div className= {`${styles.buttoncontainer}`} >
        <p className={`${styles.paragraph}`} > Don't have an account? 
        <button className={`${styles.secondary}`} type='button' onClick={ () => navigate('/signup') }  > Sign Up </button> </p>
      </div>

    </form>

    

    

  </div>

  </>
}

export default SignIn;