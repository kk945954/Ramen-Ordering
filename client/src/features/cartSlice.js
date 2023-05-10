import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [], 
    },
    reducers: {
        addToCart: (state, action) => {
            const { ramen, quantity, size } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === ramen._id && item.size === size);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.prices = existingItem.quantity * existingItem.price;
            } else {
                const item = {
                    name: ramen.name,
                    _id: ramen._id,
                    image: ramen.image,
                    size: size,
                    quantity: quantity,
                    price: ramen.price[0][size],
                    prices: ramen.price[0][size] * quantity
                };
                state.cartItems.push(item);
                toast('🍜 added to cart', {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    draggable: true,
                    theme: "dark",
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item._id === id && item.size === size);
            if (existingItemIndex >= 0) {
                state.cartItems.splice(existingItemIndex, 1);
                toast.error("🍜 removed from cart", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "light",
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },
        addQuantity: (state, action) => {
            const { id, size } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === id && item.size === size);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.prices = existingItem.quantity * existingItem.price;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        substractQuantity: (state, action) => {
            const { id, size } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === id && item.size === size);
            if (existingItem) {
                existingItem.quantity -= 1;
                existingItem.prices = existingItem.quantity * existingItem.price;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            toast.error('Cart is cleared', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
            });
            localStorage.clear();
        },

    },
});

export const { addToCart, removeFromCart, addQuantity, substractQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
