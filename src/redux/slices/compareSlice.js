import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: localStorage.getItem('compareItems') ? JSON.parse(localStorage.getItem('compareItems')) : [],
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addToCompare: (state, action) => {
            const product = action.payload;
            if (state.items.length >= 4) {
                // Max 4 items to compare
                return;
            }
            const existingItem = state.items.find(item => item._id === product._id);
            if (!existingItem) {
                state.items.push(product);
                localStorage.setItem('compareItems', JSON.stringify(state.items));
            }
        },
        removeFromCompare: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            localStorage.setItem('compareItems', JSON.stringify(state.items));
        },
        clearCompare: (state) => {
            state.items = [];
            localStorage.removeItem('compareItems');
        }
    },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
