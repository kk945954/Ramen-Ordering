import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const userSlice = createSlice({
    name: "registerOrLogin-User",
    initialState: {
        loading: false,
        error: null,
        success: false,
        currentUser: localStorage.getItem('currentUser') 
            ? JSON.parse(localStorage.getItem('currentUser')) : null
    },
    reducers: {
        registerUserRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        registerUserSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        registerUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        loginUserRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.currentUser = action.payload;
        },
        loginUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
});

export const registerUser = (user) => async (dispatch) => {
    dispatch(registerUserRequest());
    try {
        const { data } = await api.post('/api/users/register', user);
        dispatch(registerUserSuccess(data));
        window.location.href = '/login';
    } catch (error) {
        dispatch(registerUserFail(error.message));
    }

}

export const loginUser = (user) => async (dispatch) => {
    dispatch(loginUserRequest());
    try {
        const {data} = await api.post('/api/users/login', user);
        dispatch(loginUserSuccess(data));
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.href = '/';
    } catch (error) {
        dispatch(loginUserFail(error.message));
    }
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
    localStorage.clear();
}


export const { registerUserRequest, registerUserSuccess, registerUserFail, loginUserRequest, loginUserSuccess, loginUserFail } = userSlice.actions;
export default userSlice.reducer;

