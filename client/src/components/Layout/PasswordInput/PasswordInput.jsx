import React, { useState } from 'react';
import {
    AiFillEyeInvisible,
    AiFillEye
} from 'react-icons/ai';

// styles
import './passwordInput.css';

const PasswordInput = (props) => {
    // set for password to be visible 
    const [showPassword, setShowPassword] = useState(false);
    // for rendering the correct icon for show password/hide password
    const renderIcons = () => {
        if (showPassword) {
            return <AiFillEyeInvisible onClick={() => setShowPassword(false)} className="passwordInputStyles_icon" />
        } else if (!showPassword) {
            return <AiFillEye onClick={() => setShowPassword(true)} className="passwordInputStyles_icon" />
        }
    };

    return (
        <div className="passwordInputStyles_wrap">
            <input
                className={`passwordInputStyles_input small-rad ${props.className}`}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
            />
            {renderIcons()}
        </div>
    )
};

export default PasswordInput;