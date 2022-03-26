import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import AuthService from '../Services/auth.service';
import TokenService from '../Services/token.service';

function Logout() {

  const [logout, setLogout] = useState(false)

    const disconnect = () => {
        AuthService.logout()
        .then(() => TokenService.removeUser())
        .then(() => {
            setLogout(true)
            window.location.reload(false)
        }).catch(err => console.log(err))
    }

  useEffect(() => {
     disconnect();
  }, [])
  if(logout){
      return <Redirect to="/" />
  } else {
      return <h1>Not true</h1>
  }
}

export default Logout