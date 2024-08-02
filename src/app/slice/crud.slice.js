import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    findAll: [],
    count: 0
};

export const crudSlice = createSlice({
    name: 'crud',
    initialState: initialValue,
    reducers: {
        create: (state, action) => {
            state.findAll = [...state.findAll, action.payload];
        },
        update: (state, action) => {
            state.findAll = action.payload;
        },
        remove: (state, action) => {
            state.findAll = action.payload.data;
        },
    }
});

export const { increment, decrement, create, update, remove } = crudSlice.actions;