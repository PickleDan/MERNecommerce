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

const userLoginInitialState: UserLoginState = {
  loading: false,
  userInfo: userInfoFromStorage || null,
}

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: userLoginInitialState,
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
    setUserLogout(state) {
      state.userInfo = null
    },
  },
})

export interface UserRegisterState extends UserLoginState {
  name: string
}

const userRegisterInitialState: UserRegisterState = {
  loading: false,
  userInfo: userInfoFromStorage || null,
  name: "",
}

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: userRegisterInitialState,
  reducers: {
    setUserRegisterRequest(state) {
      state.loading = true
    },
    setUserRegisterSuccess(state, action: PayloadAction<any>) {
      state.loading = false
      state.userInfo = action.payload
    },
    setUserRegisterFail(state, action: PayloadAction<any>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: userRegisterInitialState,
  reducers: {
    setUserDetailsRequest(state) {
      state.loading = true
    },
    setUserDetailsSuccess(state, action: PayloadAction<any>) {
      state.loading = false
      state.userInfo = action.payload
    },
    setUserDetailsFail(state, action: PayloadAction<any>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export interface userUpdateProfileState extends UserLoginState {
  success: boolean
}

const userDetailsInitialState: userUpdateProfileState = {
  loading: false,
  userInfo: userInfoFromStorage || null,
  success: false,
}

export const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: userDetailsInitialState,
  reducers: {
    setUserUpdateProfileRequest(state) {
      state.loading = true
    },
    setUserUpdateProfileSuccess(state, action: PayloadAction<any>) {
      state.loading = false
      state.userInfo = action.payload
      state.success = true
    },
    setUserUpdateProfileFail(state, action: PayloadAction<any>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  setUserLoginRequest,
  setUserLoginSuccess,
  setUserLoginFail,
  setUserLogout,
} = userLoginSlice.actions

export const {
  setUserRegisterRequest,
  setUserRegisterSuccess,
  setUserRegisterFail,
} = userRegisterSlice.actions

export const {
  setUserDetailsRequest,
  setUserDetailsSuccess,
  setUserDetailsFail,
} = userDetailsSlice.actions

export const {
  setUserUpdateProfileRequest,
  setUserUpdateProfileSuccess,
  setUserUpdateProfileFail,
} = userUpdateProfileSlice.actions
