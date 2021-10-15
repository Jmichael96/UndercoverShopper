import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaTrashAlt
} from 'react-icons/fa';
import {
    deleteDay
} from '../../../store/actions/day';
import { isEmpty } from 'jvh-is-empty';
import {
    setModal
} from '../../../store/actions/confirmModal';

// components
import MiniLoader from '../../Layout/MiniLoader/MiniLoader';

// utils
import Constants from '../../../utils/Constants';

const DayDelete = (props) => {
    const { deleting } = useSelector((state) => state.day);
    const dispatch = useDispatch();
    const { _id } = props;
    const [selectedId, setSelectedId] = useState('');

    const deleteHandler = async (id) => {
        if (id) {
            dispatch(deleteDay(_id));
        }
    };

    const renderContent = () => {
        if (!isEmpty(selectedId)) {
            if (_id === selectedId && deleting) {
                return <MiniLoader />
            } else {
                return <FaTrashAlt style={styles.trashIcon} className="text-black" />; 
            }
        } else {
            return <FaTrashAlt style={styles.trashIcon} className="text-black" />;
        }
    };

    const initConfirmModal = async (id) => {
        setSelectedId(id);
        await dispatch(setModal('Are you sure? Deleting this will also remove all the cart items.', () => deleteHandler(_id)));
    };

    return (
        <a href="#!" onClick={() => initConfirmModal(_id)} className="small-shadow" style={styles.deleteBtn}>
            {renderContent()}
        </a>
    );
};

const styles = {
    deleteBtn: {
        position: 'absolute',
        top: '-1rem',
        left: '-1rem',
        height: '2.5rem',
        width: '2.5rem',
        borderRadius: '50%',
        backgroundColor: Constants.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    trashIcon: {

    }
};

export default DayDelete;