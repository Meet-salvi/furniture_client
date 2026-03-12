import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../api';

const API_URL = `${BASE_URL}/api/users`;

export const loginUserThunk = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const response = await axios.post(`${API_URL}/login`, userData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login Failed');
        }
    }
);

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const response = await axios.post(`${API_URL}/register`, userData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration Failed');
        }
    }
);

export const logoutUserThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout Failed');
        }
    }
);

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = { _id: action.payload._id, name: action.payload.name, email: action.payload.email };
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = { _id: action.payload._id, name: action.payload.name, email: action.payload.email };
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout API handling
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('user');
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                // Even if API fails, log out from the frontend to clear invalid state
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('user');
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
