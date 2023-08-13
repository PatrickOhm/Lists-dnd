import { createSlice, nanoid } from "@reduxjs/toolkit";
import { addList } from "./ListSlice";

const formSlice = createSlice({
    name: 'form',
    initialState: {
        newListTerm: ''
    },
    reducers: {
        changeNewListTerm(state, action) {
            state.newListTerm = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(addList, (state, action) => {
            state.newListTerm = '';
        })
    }
});

export const {
    changeNewListTerm
} = formSlice.actions;

export const formReducer = formSlice.reducer;