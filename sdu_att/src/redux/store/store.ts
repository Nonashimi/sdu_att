"use client"


import {configureStore} from "@reduxjs/toolkit"
import { isLoginReducer } from "../slice/isLoginSlice";
import { idReducer } from "../slice/IdSlice";
import { usersReducer } from "../slice/usersSlice";
import { sectionReducer } from "../slice/sectionSlice";
import { coursesReducer } from "../slice/coursesSection";
import { lectorsReducer } from "../slice/lectoreSlice";

export const store = configureStore({
    reducer: {
        isLogin: isLoginReducer,
        id: idReducer,
        users: usersReducer,
        section: sectionReducer,
        courses: coursesReducer,
        lectors: lectorsReducer
    }
}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
