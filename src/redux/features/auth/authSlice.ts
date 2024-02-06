import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface AuthState {
    user: null | object,
    token: null | string
}

const initialState: AuthState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {


            console.log(action.payload)
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.token = null
            state.user = null
        }
    },
})


export const { setUser, logout } = authSlice.actions

export default authSlice.reducer
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;