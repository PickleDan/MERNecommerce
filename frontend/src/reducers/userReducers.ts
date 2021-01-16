import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductDetails } from "../common/types"
import { CartItem } from "./cartReducers"

export interface UserLoginState {
  loading: boolean
  error?: string
  userInfo: any
}

const userInfo = localStorage.getItem("userInfo")

const userInfoFromStorage: CartItem[] = userInfo ? JSON.parse(userInfo) : null

const initialState: UserLoginState = {
  loading: false,
  userInfo: userInfoFromStorage,
}

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserLoginRequest(state) {
      state.loading = true
    },
    setUserLoginSuccess(state, action: PayloadAction<any>) {
      state.loading = false
      state.userInfo = action.payload
    },
    setUserLoginFail(state, action: PayloadAction<any>) {
      state.loading = false
      state.error = action.payload
    },
    setUserLogout() {},
  },
})

export const {
  setUserLoginRequest,
  setUserLoginSuccess,
  setUserLoginFail,
} = userLoginSlice.actions
