"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface stateId {
    id: string
}

const initialState:stateId  = {
    id:  "220107006",
}

const idSlice = createSlice({
    name: "id",
    initialState,
    reducers:{
        changeId: (state, action) =>{
            state.id = action.payload;
        }
    }
})

export const idReducer = idSlice.reducer;
export const {changeId} = idSlice.actions;