import Axios from "../lib/Axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const createProfile = createAsyncThunk('user/createProfile', async () => {
    let res = await Axios.get('https://dog.ceo/api/breeds/image/random')
    console.log(res)
    return {
        message: res.data.message}
})


export const dogSlice = createSlice({
    name: 'dog',
    initialState: {
        message: ''
    },
    reducers: {
       
    },
    extraReducers: builder => {
        builder
        .addCase(createProfile.fulfilled, (state, action) => {
            state.message = action.payload
        })
    }
})

export const {  } = dogSlice.actions

export default dogSlice.reducer