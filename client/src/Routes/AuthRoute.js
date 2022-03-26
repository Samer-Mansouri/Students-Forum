import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../Services/token.service';


export const AuthRoute = ({ component: Component, ...rest}) => {
  


  return (

     <Route
     {...rest}
     render={
       props => {
        if(!TokenService.getUser()){
          return <Component {...props} />
        }
        else {
          return <Redirect to={{
            pathname: "/",
            state: {
              from: props.location
            }
          }}
          />
        }
       }
     }
    />
   
  
  );
}

export default AuthRoute;