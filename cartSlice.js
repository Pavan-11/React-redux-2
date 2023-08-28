import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({ id: newItem.id, name: newItem.title, price: newItem.price, quantity: 1, totalPrice: newItem.price })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});


export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data: ',
            })
        );

        const sendRequest = async () => {
            const response = await fetch('https://demp-login-page-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                });
            if (!response.ok) {
                throw new Error('Sending cart data failed')
            }
        };

        try{
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'sucsess',
                title: 'Success...',
                message: 'Sent cart data Successfully ',
            }));
        } catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed',
            }))
        }
        

        
    };
}


export const cartActions = cartSlice.actions;
export default cartSlice;