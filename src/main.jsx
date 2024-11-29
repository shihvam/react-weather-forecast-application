import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  { path : '/',
    element : <ProtectedRoute> <App/> </ProtectedRoute>  },

  { path: '/signup' , element : <SignUp/> },
  { path : '/signin',element : <SignIn/> },
  { path : '/signin/signin',element : <SignIn/> }
])

createRoot(document.getElementById('root')).render(

  // <StrictMode>

    <UserAuthContextProvider>
    <RouterProvider router={router} >
    <App />
    </RouterProvider>
    </UserAuthContextProvider>

  // </StrictMode>,
)


