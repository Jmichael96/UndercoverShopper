import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCart    
} from '../../../store/actions/cart';

// utils
import Constants from '../../../utils/Constants';

// components
import MiniLoader from '../../Layout/MiniLoader/MiniLoader';
import Input from '../../Layout/Input/Input';
import Button from '../../Layout/Button/Button';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const CreateItem = (props) => {
    const [formData, setFormData] = useState({
        item: '',
        text: ''
    });
    const dispatch = useDispatch();
    const { creating } = useSelector((state) => state.cart);
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
                <Button loading={creating} type="submit">Create</Button>
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
    }
};

export default CreateItem;