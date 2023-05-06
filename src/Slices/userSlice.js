import Axios from "../lib/Axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authSuccess } from "./authSlice"


export const getUser = createAsyncThunk('user/getUser', async userObj => {
    let res = await Axios.post('/users/register', userObj)
    console.log(res)
    return {
        user: res.data.user
    }
});

export const getAcct = createAsyncThunk('user/getAcct', async (userObj, thunkAPI) => {
   let response = await Axios.get('/users/getCurrentAcct')
    let user = response.data.user
    console.log(response.data.user)

    if (response.data.user.token !== undefined) {
        thunkAPI.dispatch(authSuccess())
     }

    return {
        user: response.data.user
    }
});

export const signInUser = createAsyncThunk('user/signInUser', async (userData, thunkAPI) => {

    try {
        let res = await Axios.post('/users/signin', userData);

    if (res.data.token !== undefined) {
       localStorage.setItem('jwtToken', res.data.token)  
    }
    
    thunkAPI.dispatch(authSuccess())

    console.log(res)
   
    return {
        user: res.data.user
    }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
    
});

export const addNewMatch = createAsyncThunk('user/addNewMatch', async (newMatch, thunkAPI) => {
    let res = await Axios.post('/users/addMatch', newMatch)
    
    if (res.data.token !== undefined) {
        thunkAPI.dispatch(authSuccess())
     }
    
    console.log(res)
    return res.data.newMatch
})

export const updateAcct = createAsyncThunk('/user/updateAcct', async (userObj, thunkAPI) => {
    let update = await Axios.put('/users/updateUser', userObj);
    
    if (update.data.updateInfo.token !== undefined) {
        thunkAPI.dispatch(authSuccess())
     }
    console.log(update);

    // if (update.data.token !== undefined) {
    //     thunkAPI.dispatch(authSuccess())
    //  }
console.log(update.data)
     return update.data.updateInfo

})

export const deleteAcct = createAsyncThunk('/user/deleteAcct', async (userObj, thunkAPI) => {
    let update = await Axios.delete('/users/deleteUser', userObj);
    
    if (update.data.updateInfo.token !== undefined) {
        thunkAPI.dispatch(authSuccess())
     }
   
     return update.data.updateInfo

})
const initialState = {
    name: '',
    email: '',
    password: '',
    message: '',
    status: null,
    fulfilled: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userLogout: (state) => {
            return initialState
        },
        setUser: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email 
        }
        // getAcct: (state, action) => {
        //     state = action.payload.user
        // }
        // addMatch: (state) => {
        //     state = {
        //         ...initialState,
        //         match: newMatch
        //     }
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.name = action.payload.user.name
                state.email = action.payload.user.email
                state.password = action.payload.user.password
                state.fulfilled = action.payload.user.fulfilled
                state.status = 'fulfilled'
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                console.log(action.payload.user);
                state.name = action.payload.user.name
                state.email = action.payload.user.email
                state.password = action.payload.user.password
                state.status = 'fulfilled'
            })
            .addCase(addNewMatch.fulfilled, (state, action) => {
                state.match = (action.payload)
                console.log(state.match);
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.status = "rejected"
                state.message = action.payload.user.error.message
            })
            .addCase(getAcct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.name = action.payload.user.name
                state.email = action.payload.user.email
                state.status = 'fulfilled'
            })
            .addCase(updateAcct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.name = action.payload.name
                state.email = action.payload.email
                state.status = 'fulfilled'
            })
    }
})

export const { userLogout, setUser } = userSlice.actions

export default userSlice.reducer