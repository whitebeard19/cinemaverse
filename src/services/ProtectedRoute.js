import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {

    const user = useSelector((state) => state?.user?.email);
    console.log(user);

    if(!user){
        return <Navigate to="/login" replace />;
    }

  return children;
}

export default ProtectedRoute;