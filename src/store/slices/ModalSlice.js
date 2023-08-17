import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        listId: null,
        isOpen: false
    },
    reducers: {
        openModal(state, action) {
            state.isOpen = true;
            state.listId = action.payload.id
        },

        closeModal(state, action) {
            state.isOpen = false;
        },
    }
});

export const {
    openModal,
    closeModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

