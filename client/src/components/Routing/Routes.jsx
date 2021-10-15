import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

//components
import Alert from '../Layout/Alert/Alert';
import PrivateRoute from './PrivateRoute';
import ConfirmModal from '../Layout/ConfirmModal/ConfirmModal';
import Navbar from '../Layout/Navbar/Navbar';

// pages
import Auth from '../../pages/Auth/Auth';
import Home from '../../pages/Home/Home';
import Cart from '../../pages/Cart/Cart';

const Routes = (props) => {

    return (
        <main>
            <Navbar />
            <ConfirmModal />
            <Alert />
            <Switch>
                <Route exact path="/" component={Auth} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/cart" component={Cart} />
            </Switch>
        </main>
    );
};

export default Routes;