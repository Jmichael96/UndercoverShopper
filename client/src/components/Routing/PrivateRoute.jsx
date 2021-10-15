import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'jvh-is-empty';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const {isAuth, authLoading, token} = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={props =>
                !isAuth && !authLoading && isEmpty(token) ? (
                    <Redirect to='/' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;