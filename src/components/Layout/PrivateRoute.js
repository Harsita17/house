import {Navigate,Outlet} from 'react-router-dom'

import React from 'react'
import useAuthState from '../../hooks/UseAuthState'
import Spinner from '../Spinner'

const PrivateRoute = () => {
    const{loggedin,checkState}=useAuthState()
    if(checkState){
        return <Spinner/>;
    }

  return loggedin ? <Outlet/> : <Navigate to="/Signin"/>
}

export default PrivateRoute