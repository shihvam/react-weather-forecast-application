import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userAuthContext from "../context/UserAuthContext";

const ProtectedRoute = ({children}) => {

  const {user} = useContext(userAuthContext);


  console.log('Protected route user', user);

  const navigate = useNavigate();

  function authenticate() {
    if( user === null ) {
      return navigate('/signin');
    }
  }


    authenticate();


    

  

  return children;
}

export default ProtectedRoute;