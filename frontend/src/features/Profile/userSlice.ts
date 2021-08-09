import { State } from "./../../app/store"
import { Dispatch } from "redux"
import { Brand, RequestStatuses } from "./../../common/types"
import axios from "axios"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem } from "../Cart/cartSlice"

export type UserId = Brand<string, "user_id">

export type UserInfo = {
  _id: UserId
  name: string
  email: string
  isAdmin: boolean
  token: string
} | null

export interface UserLoginState {
  status: RequestStatuses
  error?: string
  userInfo: UserInfo
}

const userInfo = localStorage.getItem("userInfo")

const userInfoFromStorage: UserInfo = userInfo ? JSON.parse(userInfo) : null

const userLoginInitialState: UserLoginState = {
  status: "idle",
  userInfo: userInfoFromStorage || null,
}

export const login = createAsyncThunk(
  "login",
  async (loginInfo: { email: string; password: string }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/api/users/login", loginInfo, config)
    localStorage.setItem("userInfo", JSON.stringify(data))
    return data
  }
)

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch(setUserLogout())
}

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: userLoginInitialState,
  reducers: {
    setUserLogin(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
    },
    setUserLogout(state) {
      state.userInfo = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.status = "succeeded"
        state.userInfo = action.payload
      }
    )
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message
    })
  },
})

export interface UserRegisterState extends UserLoginState {
  name: string
}

const userRegisterInitialState: UserRegisterState = {
  status: "idle",
  userInfo: userInfoFromStorage || null,
  name: "",
}

export const register = createAsyncThunk(
  "register",
  async (
    registerInfo: { name: string; email: string; password: string },
    { dispatch }
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post("/api/users", registerInfo, config)

    dispatch(userLoginSlice.actions.setUserLogin(data))
    localStorage.setItem("userInfo", JSON.stringify(data))
    return data
  }
)

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: userRegisterInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.status = "succeeded"
        state.userInfo = action.payload
      }
    )
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message
    })
  },
})

export const getUserDetails = (id: UserId) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const {
    userLogin: { userInfo },
  } = getState()

  try {
    dispatch(setUserDetailsRequest())

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch(setUserDetailsSuccess(data))
  } catch (error) {
    dispatch(
      setUserDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: userRegisterInitialState,
  reducers: {
    setUserDetailsRequest(state) {
      state.status = "loading"
    },
    setUserDetailsSuccess(state, action: PayloadAction<UserInfo>) {
      state.status = "succeeded"
      state.userInfo = action.payload
    },
    setUserDetailsFail(state, action: PayloadAction<string>) {
      state.status = "failed"
      state.error = action.payload
    },
  },
})

export interface userUpdateProfileState extends UserLoginState {
  success: boolean
}

const userDetailsInitialState: userUpdateProfileState = {
  status: "idle",
  userInfo: userInfoFromStorage || null,
  success: false,
}

export const updateUserProfile = (user: {
  id: UserId
  name: string
  password: string
}) => async (dispatch: Dispatch, getState: () => State) => {
  const {
    userLogin: { userInfo },
  } = getState()

  try {
    dispatch(setUserUpdateProfileRequest())

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch(setUserUpdateProfileSuccess(data))
  } catch (error) {
    dispatch(
      setUserUpdateProfileFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: userDetailsInitialState,
  reducers: {
    setUserUpdateProfileRequest(state) {
      state.status = "loading"
    },
    setUserUpdateProfileSuccess(state, action: PayloadAction<UserInfo>) {
      state.status = "succeeded"
      state.userInfo = action.payload
      state.success = true
    },
    setUserUpdateProfileFail(state, action: PayloadAction<any>) {
      state.status = "failed"
      state.error = action.payload
    },
  },
})

export const { setUserLogout } = userLoginSlice.actions

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
