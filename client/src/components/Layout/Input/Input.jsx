import React from 'react';

const Input = (props) => {
    if (props.inputType === 'input') {
        return <input className="small-rad" style={{ ...styles, ...props.style }} type={props.type} name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
    } else {
        return <textarea className="small-rad" style={{ ...styles, ...props.style }} rows="4" name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder}></textarea> 
    }
};

const styles = {
    width: '100%',
    padding: '.3rem',
    fontSize: '1rem',
    color: 'black',
    border: '1px solid white',
    margin: '1rem 0',
    outline: 'none',
    backgroundColor: 'white'
};

export default Input;