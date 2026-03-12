import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item._id === product._id);

            if (existingItem) {
                state.items = state.items.filter(item => item._id !== product._id);
            } else {
                state.items.push(product);
            }
            localStorage.setItem('wishlistItems', JSON.stringify(state.items));
        },
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem('wishlistItems');
        }
    },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
