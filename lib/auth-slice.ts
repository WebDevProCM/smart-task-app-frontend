import { AuthSliceType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




//initial auth slice state
const initialState: AuthSliceType = {
  user: {},
  isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth-slice",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<AuthSliceType>) => {
            state.user = action.payload.user
            state.isAuthenticated = true
        },

        logoutUser: state => {
            state.user = {}
        },

        updateUser: (state, action: PayloadAction<AuthSliceType>) => {
            state.user = action.payload.user
            state.isAuthenticated = false
        }
    }
})


export default authSlice

export const {loginUser, logoutUser, updateUser} = authSlice.actions