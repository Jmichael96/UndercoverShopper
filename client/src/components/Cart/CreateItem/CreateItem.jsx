import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'jvh-is-empty';
import {
    createCart    
} from '../../../store/actions/cart';

// utils
import Constants from '../../../utils/Constants';

// components
import Input from '../../Layout/Input/Input';
import Button from '../../Layout/Button/Button';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const CreateItem = (props) => {
    const [formData, setFormData] = useState({
        item: '',
        text: ''
    });
    const dispatch = useDispatch();

    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const { item, text } = formData;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        let newFormData = {
            item, 
            text,
            dayId: props.dayId
        };
        await dispatch(createCart(newFormData));
        resetInputs();
    };

    const resetInputs = () => {
        setFormData({
            item: '',
            text: ''
        });
    };

    return (
        <form className="large-shadow large-rad" style={styles.form} onSubmit={(e) => onSubmitHandler(e)}>
            <Input value={item} name="item" inputType="input" placeholder="Your Item *" onChange={(e) => onChangeHandler(e)} />
            <Input value={text} name="text" inputType="textarea" placeholder="Notes" onChange={(e) => onChangeHandler(e)} />
            <Wrapper styles={{ justifyContent: 'flex-end' }}>
                <Button type="submit">Create</Button>
            </Wrapper>
        </form>
    );
};

const styles = {
    form: {
        padding: '.2rem 1rem',
        backgroundColor: Constants.main,
        width: '100%',
        maxWidth: '30rem',
        margin: '1rem'
    },
    input: {

    }
};

export default CreateItem;