import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../components/utils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Redirect to="/user" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;