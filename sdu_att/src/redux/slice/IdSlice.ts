"use client"

import { createSlice } from "@reduxjs/toolkit"

export interface StateId {
    id: string
}

const initialState:StateId  = {
    id:  "220107016",
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