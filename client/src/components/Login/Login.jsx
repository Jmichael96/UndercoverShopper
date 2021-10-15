import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// components 
import Input from '../Layout/Input/Input';
import PasswordInput from '../Layout/PasswordInput/PasswordInput';
import Button from '../Layout/Button/Button';
import Wrapper from '../Layout/Wrapper/Wrapper';

// utils

// styles
import './login.css';

const Login = (props) => {
    const dispatch = useDispatch();
    const { history, login, authLoading } = props;
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const { username, password } = formData;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        await dispatch(login(formData, history));
    };

    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <Input value={username} onChange={(e) => onChange(e)} inputType="input" type="text" name="username" placeholder="Username" />
            <PasswordInput value={password} onChange={(e) => onChange(e)} name="password" />
            <Wrapper styles={{ justifyContent: 'flex-end' }}>
                <Button loading={authLoading} type="submit">Login</Button>
            </Wrapper>
        </form>
    );
};

export default Login;