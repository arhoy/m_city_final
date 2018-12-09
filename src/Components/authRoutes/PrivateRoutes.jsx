import React from 'react';
import {Route ,Redirect} from 'react-router-dom';

const PrivateRoutes = (props) => {
    const {user ,component:Component} = props;
    if (!user) {return  <Redirect to  = "/" /> }
       
    
    return (
        <Route {...props} component = { (props)=> <Component {...props} user = {user} /> } />
    );
};

export default PrivateRoutes;