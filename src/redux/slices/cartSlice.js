import { createSlice } from '@reduxjs/toolkit';

const initialItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
let initialQty = 0;
let initialTotal = 0;
if (initialItems.length > 0) {
    initialItems.forEach(item => {
        initialQty += item.quantity || 1;
        initialTotal += item.price * (item.quantity || 1);
    });
}

const initialState = {
    items: initialItems,
    totalQuantity: initialQty,
    totalPrice: initialTotal,
};

// Calculate totals Helper
const calculateTotals = (state) => {
    let quantity = 0;
    let price = 0;
    state.items.forEach(item => {
        quantity += item.quantity;
        price += item.price * item.quantity;
    });
    state.totalQuantity = quantity;
    state.totalPrice = price;
    localStorage.setItem('cartItems', JSON.stringify(state.items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);

            if (existingItem) {
                existingItem.quantity += newItem.quantity || 1;
            } else {
                state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
            }
            calculateTotals(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item._id !== id);
            calculateTotals(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item._id === id);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            calculateTotals(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            localStorage.removeItem('cartItems');
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
