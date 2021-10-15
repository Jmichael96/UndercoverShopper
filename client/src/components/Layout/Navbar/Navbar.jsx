import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Llama from '../../../assets/llama.png';
import { 
    AiFillLeftCircle
} from 'react-icons/ai';
import {
    logout
} from '../../../store/actions/auth';

// components
import Wrapper from '../Wrapper/Wrapper';

// utils
import Constants from '../../../utils/Constants';
import Button from '../Button/Button';


const Navbar = ({ history }) => {
    const dispatch = useDispatch();
    const styles = {
        nav: {
            height: '4rem',
            backgroundColor: Constants.main,
        },
        llamaImg: {
            height: '4rem',
            marginRight: '1rem'
        },
        backBtnWrap: {
            display: window.location.pathname === '/cart' ? 'flex' : 'none',
            alignItems: 'center',
            marginLeft: '1rem',
            textDecoration: 'none',
            color: 'black'
        },
        backIcon: {
            fontSize: '2rem'
        },
        backText: {
            marginLeft: '.5rem'
        },
    };

    const redirectBack = () => {
        history.push('/home');
    };

    return (
        <nav style={styles.nav} className="small-shadow">
            <Wrapper styles={{ justifyContent: window.location.pathname === '/' ? 'flex-end' : 'space-between' }}>
                <a href="#!" onClick={redirectBack} style={styles.backBtnWrap}>
                    <AiFillLeftCircle style={styles.backIcon} className="black-text" />
                    <span style={styles.backText} className="black-text">Go Back</span>
                </a>
                <Button onClick={() => dispatch(logout(history))} style={{ marginLeft: '1rem', display: window.location.pathname === '/home' ? 'flex' : 'none' }}>Logout</Button>
                <img style={styles.llamaImg} src={Llama} alt="llama" />
            </Wrapper>
        </nav>
    );
};

export default withRouter(Navbar);