
import UseAuth from './UseAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
   const {isLoggedin} =UseAuth();
   console.log("In Particular " ,isLoggedin);
    return (
       isLoggedin==true ? <Outlet/> : < Navigate to ="/signup"/>        
  )
}

export default ProtectedRoute

