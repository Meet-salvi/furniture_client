import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// Place an order
export const placeOrder = createAsyncThunk(
    'orders/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            };
            const response = await axios.post(API_URL, orderData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to place order');
        }
    }
);

// Get user orders
export const getUserOrders = createAsyncThunk(
    'orders/getUserOrders',
    async (userId, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true,
            };
            const response = await axios.get(`${API_URL}/${userId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

// Cancel an order
export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true,
            };
            const response = await axios.put(`${API_URL}/${orderId}/cancel`, {}, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
        }
    }
);

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
    success: false,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.order = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Place Order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
                state.error = null;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get User Orders
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Cancel Order
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                // Update the order in the list
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
                state.success = true;
                state.error = null;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
