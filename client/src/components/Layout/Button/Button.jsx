import React from 'react';

// utils
import Constants from '../../../utils/Constants';

// components
import MiniLoader from '../MiniLoader/MiniLoader';


const Button = (props) => {
    return <button className="small-shadow" type={props.type} style={{ ...buttonStyles, ...props.style }} onClick={props.onClick}>{!props.loading ? props.children : <MiniLoader />}</button>;
};

const buttonStyles = {
    color: Constants.btnColor,
    backgroundColor: Constants.btnBg,
    border: `1px solid ${Constants.btnBg}`,
    borderRadius: '3px',
    height: '2.5rem',
    fontSize: '1.2rem',
    fontWeight: '500',
    padding: '.4rem .6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none',
    margin: '1rem 0'
};

export default Button;