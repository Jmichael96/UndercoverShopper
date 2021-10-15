import React from 'react';
import { isEmpty } from 'jvh-is-empty';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import {
    AiOutlineArrowRight
} from 'react-icons/ai';
import {
    setDay
} from '../../../store/actions/day';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';
import DayDelete from '../DayDelete/DayDelete';

// utils
import Constants from '../../../utils/Constants';

const DayItem = (props) => {
    const { _id, day, userId, createdAt } = props;
    const dispatch = useDispatch();

    const redirect = async () => {
        let dayObj = {
            _id, 
            day,
            userId,
            createdAt
        };
        dispatch(setDay(dayObj));
        props.history.push('/cart');
    };

    return (
        <div style={styles.card} className="large-shadow large-rad">
            <DayDelete _id={_id} />
            <Wrapper onClick={redirect}  styles={{ justifyContent: 'space-between' }}>
                <h3 className="black-white">{day}</h3>
                <AiOutlineArrowRight style={styles.arrow} />
            </Wrapper>
        </div>
    );
};

const styles = {
    card: {
        width: '100%',
        maxWidth: '30rem',
        margin: '4rem 0',
        backgroundColor: Constants.main,
        padding: '0 1rem',
        cursor: 'pointer',
        display: 'block',
        position: 'relative',
    },
    arrow: {
        fontSize: '1.4rem'
    }
};

export default withRouter(DayItem);