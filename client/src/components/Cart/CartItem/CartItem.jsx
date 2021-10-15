import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    FaArrowAltCircleDown
} from 'react-icons/fa';
import { isEmpty } from 'jvh-is-empty';
import {
    markComplete,
    markUnComplete,
    deleteItem
} from '../../../store/actions/cart';
import {
    setModal
} from '../../../store/actions/confirmModal';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';

// utils
import Constants from '../../../utils/Constants';
import useLongPress from '../../../utils/useLongPress';

import './cartItem.css';

const CartItem = (props) => {
    const onLongPress = useLongPress();
    const { _id, item, text, open, isChecked } = props.item;
    const dispatch = useDispatch();

    const renderIconStyles = () => {
        if (open) {
            return { ...styles.downIcon, ...styles.downIconRotate };
        } else {
            return styles.downIcon;
        }
    };

    const renderContentWrapStyles = () => {
        if (open) {
            return { ...styles.contentWrap, ...styles.contentOpen };
        } else {
            return styles.contentWrap;
        }
    };

    const renderContentTextStyles = () => {
        if (open) {
            return { ...styles.contentText, ...styles.contentTextOpen };
        } else {
            return styles.contentText;
        }
    };

    const styles = {
        card: {
            width: '100%',
            position: 'relative',
            marginBottom: '1rem',
            backgroundColor: 'grey'
        },
        titleWrap: {
            backgroundColor: Constants.main,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'left',
            fontWeight: 'lighter',
            position: 'relative',
            padding: '10px',
            zIndex: '2',
            borderRadius: '4px',
            marginTop: '2px',
            transition: 'all .2s ease -in',
        },
        titleText: {

        },
        iconWrap: {
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            height: 'auto'
        },
        downIcon: {
            fontSize: '1.8rem',
            color: 'black',
            cursor: 'pointer',
            transition: 'all .6s cubic-bezier(0.080, 1.090, 0.320, 1.275)'
        },
        downIconRotate: {
            transform: 'rotate(180deg)'
        },
        contentWrap: {
            height: '30px',
            backgroundColor: 'transparent',
            borderRadius: '4px',
            color: 'white',
            fontSize: '14px',
            textAlign: 'center',
            position: 'relative',
            zIndex: '1',
            marginTop: '-30px',
            textAlign: 'left',
            transition: 'all 50ms cubic-bezier(0.600, -0.280, 0.735, 0.045)'
        },
        contentOpen: {
            marginTop: '0px',
            height: 'auto',
            transition: 'all 350ms cubic-bezier(0.080, 1.090, 0.320, 1.275)'
        },
        contentText: {
            padding: '15px',
            visibility: 'hidden',
            opacity: '0',
            overflow: 'auto',
            transition: 'all .1s ease-in',
            color: 'black'
        },
        contentTextOpen: {
            visibility: 'visible',
            opacity: '1',
            transition: 'all .8s ease-in'
        },
        checkboxWrap: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxInput: {
            padding: '0',
            height: 'initial',
            width: 'initial',
            marginBottom: '0',
            display: 'none',
            cursor: 'default',
        },
        checkboxLabel: {
            position: 'relative',
            cursor: 'default',
            opacity: isChecked ? '1' : '.4'
        }
    };

    // function dictates whether to mark item complete or un-complete
    const onIsCompleteHandler = async (isComplete) => {
        if (props.dayId) {
            if (!isComplete) {
                await dispatch(markComplete(props.dayId, _id));
            } else if (isComplete) {
                await dispatch(markUnComplete(props.dayId, _id));
            }
        }
    };

    // initiates when user holds the item down
    const longPressHandler = async () => {
        if (_id && props.dayId) {
            await dispatch(setModal(`Are you sure you want to delete the item ${item}`, () => dispatch(deleteItem(props.dayId, _id))));
        }
    };

    return (
        <div style={styles.card} className="small-shadow large-rad">
            <div style={styles.titleWrap} {...onLongPress(() => longPressHandler())}>
                {!isEmpty(text) &&
                    <div style={styles.iconWrap} onClick={props.toggleAccordion}>
                        <FaArrowAltCircleDown style={renderIconStyles()} />
                    </div>
                }
                <Wrapper styles={{ justifyContent: 'flex-start' }}>
                    <div onClick={() => onIsCompleteHandler(isChecked)} style={styles.checkboxWrap} className="form-group">
                        <input style={styles.checkboxInput} checked={isChecked ? true : false} disabled type="checkbox" id="lowercaseCheck" />
                        <label style={styles.checkboxLabel} htmlFor="lowercaseCheck"></label>
                    </div>
                    <span className="black-text">{item}</span>
                </Wrapper>
            </div>
            <div style={renderContentWrapStyles()}>
                <div
                    style={renderContentTextStyles()}
                >
                    {" "}
                    {text}
                </div>
            </div>
        </div>
    );
};

export default CartItem