import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'jvh-is-empty';
import {
    closeModal
} from '../../../store/actions/confirmModal';

// components
import Wrapper from '../Wrapper/Wrapper';
import Button from '../Button/Button';

// utils
import Constants from '../../../utils/Constants';

const ConfirmModal = (props) => {
    const { modalData, isOpen } = useSelector((state) => state.confirmModal);
    const dispatch = useDispatch();

    const actionHandler = () => {
        modalData.modalAction()
        dispatch(closeModal());
    };
    
    const styles = {
        modalWindow: {
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '999',
            WebkitTransition: 'all 0.3s',
            MozTransition: 'all 0.3s',
            OTransition: 'all 0.3s',
            transition: 'all 0.3s',
            visibility: isOpen ? 'visible' : 'hidden',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none'
        },
        modalContainer: {
            width: '90%',
            maxWidth: '30rem',
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: '1rem',
            WebkitTransform: 'translate(-50%, -50%)',
            MozTransform: 'translate(-50%, -50%)',
            OTransform: 'translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)',
            background: '#f8f8f8',
            borderRadius: '8px',
            overflow: 'hidden',
        },
        modalText: {
            textAlign: 'center',
            margin: '1rem'
        }
    };

    return (
        <div
            style={styles.modalWindow}
            id="open-modal"
            className="modal-window"
        >
            <div style={styles.modalContainer}>
                <div style={styles.modalText} id="modalContent">
                    {!isEmpty(modalData.modalText) && modalData.modalText}
                </div>
                <Wrapper styles={{ justifyContent: 'space-evenly' }}>
                    <Button onClick={() => { dispatch(closeModal()) }}>CANCEL</Button>
                    <Button onClick={actionHandler}>CONFIRM</Button>
                </Wrapper>
            </div>
        </div>
    );
};

export default ConfirmModal;