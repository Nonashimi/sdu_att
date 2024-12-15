"use client"

import {createSlice} from "@reduxjs/toolkit"

export interface stateLogin{
    isLogin: boolean,
    count: number
}
const initialState:stateLogin = {
    isLogin: false,
    count: 1
}

const isLoginSlice = createSlice({
    name: "s",
    initialState,
    reducers:{
        clickLogin:(state) =>{
            state.isLogin = true;
        },
        clickLogOut:(state) =>{
            state.isLogin = false;
        }
    }
});

export const {clickLogin, clickLogOut} = isLoginSlice.actions;
export const isLoginReducer = isLoginSlice.reducer;