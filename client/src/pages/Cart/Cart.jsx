import React, { useState, useEffect } from 'react';
import { isEmpty } from 'jvh-is-empty';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAll
} from '../../store/actions/cart';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import PageLoader from '../../components/Layout/PageLoader/PageLoader';
import MiniLoader from '../../components/Layout/MiniLoader/MiniLoader';
import CreateItem from '../../components/Cart/CreateItem/CreateItem';
import CartItem from '../../components/Cart/CartItem/CartItem';

// utils
import Constants from '../../utils/Constants';

const Cart = (props) => {
    const dayState = useSelector((state) => state.day);
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [formattedItems, setFormattedItems] = useState([]);
    const [formattedCompleteItems, setFormattedCompleteItems] = useState([]);

    useEffect(() => {
        let dayId = dayState.day._id;

        if (!isEmpty(dayId)) {
            dispatch(fetchAll(dayId));
        }
    }, [dayState.day._id]);

    // updates the items that aren't complete 
    useEffect(() => {
        let formatArr = [];
        if (!isEmpty(cartState.items)) {
            for (let item of cartState.items) {
                formatArr.push({
                    open: false,
                    _id: item._id,
                    item: item.item,
                    text: item.text,
                    isChecked: item.isChecked,
                    dayId: item.dayId
                });
            }
            setFormattedItems(formatArr);
        }
    }, [cartState.items]);

    useEffect(() => {
        let formatArr = [];
        if (!isEmpty(cartState.completedItems)) {
            for (let item of cartState.completedItems) {
                formatArr.push({
                    open: false,
                    _id: item._id,
                    item: item.item,
                    text: item.text,
                    isChecked: item.isChecked,
                    dayId: item.dayId
                });
            }
            setFormattedCompleteItems(formatArr);
        }
    }, [cartState.completedItems]);

    const toggleAccordionItems = (i) => {
        const newAccordion = formattedItems.slice();
        const index = newAccordion.indexOf(i);
        newAccordion[index].open = !newAccordion[index].open;
        setFormattedItems(newAccordion);
    };

    const toggleCompletedAccordion = (i) => {
        const newAccordion = formattedCompleteItems.slice();
        const index = newAccordion.indexOf(i);
        newAccordion[index].open = !newAccordion[index].open;
        setFormattedCompleteItems(newAccordion);
    };

    const renderItems = () => {
        if (!cartState.fetching && isEmpty(cartState.items)) {
            return null;
        }
        return Object.values(formattedItems).map((item, i) => {
            return <CartItem dayId={dayState.day._id} toggleAccordion={() => toggleAccordionItems(item)} key={i + 1} item={item} />
        });
    };

    const renderCompletedItems = () => {
        if (!cartState.fetching && isEmpty(cartState.completedItems)) {
            return null;
        }
        return Object.values(formattedCompleteItems).map((completedItem, i) => {
            console.log(completedItem)
            return <CartItem dayId={dayState.day._id} toggleAccordion={() => toggleCompletedAccordion(completedItem)} key={i + 1} item={completedItem} />
        });
    };

    return cartState.fetching || dayState.fetching ? <PageLoader /> : (
        <article>
            <Wrapper styles={{ marginTop: '2rem', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                {dayState.day && <CreateItem dayId={dayState.day._id} />}
                {!isEmpty(cartState.items) && 
                <section style={styles.itemWrap}>
                    {renderItems()}
                </section>}
            </Wrapper>
            {!isEmpty(cartState.completedItems) && <Wrapper styles={{ marginTop: '2rem' }}>
                <h2>Completed</h2>
            </Wrapper>}
            <Wrapper>
                <section style={styles.completedSection}>
                    {!cartState.fetching && renderCompletedItems()}
                </section>
            </Wrapper>
        </article>
    );
};

const styles = {
    completedSection: {
        width: '30rem',
        backgroundColor: 'transparent',
        margin: '1rem'
    },
    itemWrap: {
        width: '30rem',
        backgroundColor: 'transparent',
        margin: '1rem'
    }
};

export default Cart;