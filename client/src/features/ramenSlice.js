import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    items: [],
    loading: false,
    error: null,
}

export const getAllRamens = createAsyncThunk("ramens/getAllRamens", async (id = null, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/ramens/getallramens');
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
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