import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import WelcomeMessage from './WelcomeMessage';
import { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import userAuthContext from '../context/UserAuthContext';


const SignIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const {signUp} = useContext(userAuthContext);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');
    
    try{

      await signUp(email, password);
      navigate('/signin')

    }catch(err) {
      setError(err.message)
    }

  }


  return <>

  <div className={`${styles.main}`}>

    <WelcomeMessage/>

    <form className={`${styles.container}`} onSubmit={ (e) => handleSubmit(e) } >

      <h1 className={`${styles.heading}`} > Good Day! </h1>
      <p className={`${styles.paragraph}`} > Please sign up to continue using application </p>

      {error && <Alert variant='danger'> {error} </Alert>}

      <div className={`${styles.inputContainer}`} >
        <label className={`${styles.label}`} htmlFor='email'> Email Id </label>
        <input className={`${styles.input}`} 
        id='email' name='email' 
        placeholder='Enter your email Id' 
        type='mail'
        value={email}
        onChange={ (e) => setEmail(e.target.value) }
        />
      </div>

      <div className={`${styles.inputContainer}`} >
        <label className={`${styles.label}`} htmlFor='password'> Password </label>
        <input className={`${styles.input}`} 
        id='password' 
        name='password' 
        placeholder='Enter password' 
        type='password'
        value={password}
        onChange={ (e) => setPassword(e.target.value) }
        />
      </div>

      <button type='submit' className={`${styles.primarybutton}`} > Sign Up </button>

      <div className= {`${styles.buttoncontainer}`} >
        <p className={`${styles.paragraph}`} > Already signed up? 
        <button className={`${styles.secondary}  `} type='button' onClick={ () => navigate('/signin') }  > Login </button> </p>
      </div>

    </form>

  </div>

  </>
}

export default SignIn;