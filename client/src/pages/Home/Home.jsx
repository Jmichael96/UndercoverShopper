import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
    createDay,
    fetchAllDays
} from '../../store/actions/day';
import { isEmpty } from 'jvh-is-empty';

// components 
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import Calendar from 'react-calendar';
import DayItem from '../../components/days/DayItem/DayItem';
import PageLoader from '../../components/Layout/PageLoader/PageLoader';
import MiniLoader from '../../components/Layout/MiniLoader/MiniLoader';

// styles
import './home.css';
import 'react-calendar/dist/Calendar.css';


const Home = (props) => {
    const [dateVal, setDateVal] = useState();
    // console.log(moment(dateVal).format("dd, ll"))
    const { days, fetching, hasFetchedAll } = useSelector((state) => state.day);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!fetching && !hasFetchedAll && isEmpty(days)) {
            dispatch(fetchAllDays())
        }
    }, [fetchAllDays]);

    useEffect(() => {
        if (dateVal) {
            createDateHandler(moment(dateVal).format("dd, ll").toString());
        }
    }, [dateVal, isEmpty]);

    const createDateHandler = async (date) => {
        await dispatch(createDay(date));
    };

    const renderDayItems = () => {
        if (!fetching && isEmpty(days)) {
            return null;
        }
        return Object.values(days).map((day, i) => {
            return <DayItem key={i + 1} _id={day._id} userId={day.userId} createdAt={day.createdAt} day={day.day} />
        });
    };

    return (
        <article>
            <Wrapper styles={{ marginTop: '2rem' }}>
                <Calendar
                    onChange={setDateVal}
                    value={dateVal}
                    className="large-shadow large-rad calender"
                />
            </Wrapper>
            <Wrapper>
                <section style={styles.dayWrapper}>
                    {isEmpty(days) && fetching ? <Wrapper><PageLoader /></Wrapper> : renderDayItems()}
                </section>
            </Wrapper>
        </article>
    );
};

const styles = {
    dayWrapper: {
        width: '90%',
        maxWidth: '30rem'
    }
};

export default Home;