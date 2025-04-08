
import UseAuth from './UseAuth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
   const {isLoggedin} =UseAuth();
    return (
       isLoggedin==false ? <Outlet/> : < Navigate to ="/visual"/>        
  )
}

export default AuthRoute
