import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    findAll: JSON.parse(window.localStorage.getItem('userData')) || [],
    count: 0
};

export const crudSlice = createSlice({
    name: 'crud',
    initialState: initialValue,
    reducers: {
        create: (state, action) => {
            state.findAll = [...state.findAll, action.payload];
            window.localStorage.setItem('userData', JSON.stringify(state.findAll));
        },
        update: (state, action) => {
            state.findAll = action.payload;
            window.localStorage.setItem('userData', JSON.stringify(state.findAll));
        },
        remove: (state, action) => {
            state.findAll = action.payload.data;
            window.localStorage.setItem('userData', JSON.stringify(state.findAll));
        },
    }
});

export const { increment, decrement, create, update, remove } = crudSlice.actions;