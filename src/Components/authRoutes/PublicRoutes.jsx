import React from 'react';
import {Route ,Redirect} from 'react-router-dom';

const PublicRoutes = (props) => {
    if( props.user && props.path === '/signin') {
        return (
            <Redirect to = "/dashboard"/>
        )
    }
    return (
        <Route {...props}  />
    );
};
export default PublicRoutes;