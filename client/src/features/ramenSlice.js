import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    items: [],
    loading: false,
    error: null,
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getAllRamens = createAsyncThunk("ramens/getAllRamens", async() => {
    try {
        const response = await api.get('/api/ramens/getallramens');
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

const ramenSlice = createSlice({
    name: "ramens",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRamens.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRamens.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getAllRamens.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
})

export default ramenSlice.reducer;