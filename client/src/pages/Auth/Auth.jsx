import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
    register,
    login
} from '../../store/actions/auth';
import { useSelector } from 'react-redux';
import { isEmpty } from 'jvh-is-empty';

// components
import Register from '../../components/Register/Register';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import Login from '../../components/Login/Login';

// utils
import Constants from '../../utils/Constants';

// styles
import './auth.css';

const Auth = (props) => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const { token, isAuth, authLoading, user} = useSelector((state) => state.auth);
    
    const toggleLogin = () => {
        setIsLoggingIn(!isLoggingIn);
    };

    useEffect(() => {
        if (!authLoading && isAuth && !isEmpty(token)) {
            props.history.push('/home');
        }
    }, [authLoading, isAuth, props.history, token]);

    return (
        <article id="authRoot" className="large-shadow large-rad" style={{ backgroundColor: Constants.main }}>
            <h3 style={styles.authTitle}>{isLoggingIn ? 'Login' : 'Register'}</h3>
            {isLoggingIn ? <Login login={login} authLoading={authLoading} history={props.history} />: <Register authLoading={authLoading} register={register} history={props.history} />}
            <Wrapper>
                { isLoggingIn && <p style={styles.bottomText}>Don't have an account? <a style={styles.changeFormBtn} href="#!" onClick={toggleLogin}>Register</a></p>}
                { !isLoggingIn && <p style={styles.bottomText}>Already have an account? <a style={styles.changeFormBtn} href="#!" onClick={toggleLogin}>Login</a></p>}
            </Wrapper>
        </article>
    );
};

const styles = {
    authTitle: {
        fontSize: '1.6rem',
        fontWeight: '600',
        margin: '1rem 0'
    },
    bottomText: {
        color: 'black',
        fontWeight: '400'
    },
    changeFormBtn: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: '600'
    }
};

export default withRouter(Auth);