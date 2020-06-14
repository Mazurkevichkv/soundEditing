import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../../services/authService';
import routes from '../../Routes/Routes.const';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authService.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={routes.LOGIN} />
            )
        }
    />
);

export default PrivateRoute;
