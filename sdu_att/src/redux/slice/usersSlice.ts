import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export interface user{number: string, pass: string, name: string, id: number, surname: string, status: string, email: string, [key: string]: string | number};

export interface stateUser{
    users: user[],
    loading: boolean,
    error: string | null 
}

const initialState:stateUser = {
    users: [],
    loading: false,
    error: ""
}


export const fetchUsers = createAsyncThunk<any[]>("users/fetchUsers", async() =>{
    const {data} = await axios.get("https://81f65749004d8789.mokky.dev/users");
    return data;
});


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
           // pending
           builder.addCase(fetchUsers.pending, (state, action) =>{
            state.loading = true;
        })
        // fulfilled
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
            state.users = action.payload;
            state.loading = false;
        })
        // rejected
        builder.addCase(fetchUsers.rejected, (state, action) =>{
            state.users = [];
            state.loading = false;
            state.error = action.error.message || "An error occurred";
        })
    }
});

export const usersReducer = usersSlice.reducer;