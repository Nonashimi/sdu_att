import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface lector{
    id: number,
    name_surname: string,
}
export interface stateLectors{
    lectors: lector[],
    loading: boolean,
    error:string | null
   
}

const initialState:stateLectors = {
    lectors: [],
    loading: false,
    error: null
};


export const fetchLectors = createAsyncThunk("lectors/fetchLectors", async() =>{
    const {data} = await axios.get("https://81f65749004d8789.mokky.dev/lectore");
    return data;
});


const lectorsSlice = createSlice({
    name: "lectors",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchLectors.pending, (state, action) =>{
            state.loading = true;
        })
        builder.addCase(fetchLectors.fulfilled, (state, action) =>{
            state.lectors = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchLectors.rejected, (state, action) =>{
            state.lectors = [];
            state.loading = false;
            state.error = action.error.message || 'this is error';
        })
    }
})


export const lectorsReducer = lectorsSlice.reducer;