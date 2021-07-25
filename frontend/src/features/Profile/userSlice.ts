import { Dispatch } from 'redux';
import { RequestStatuses } from './../../common/types';
import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem } from "../Cart/cartSlice"

export interface UserLoginState {
  status: RequestStatuses,
  error?: string
  userInfo: any
}

const userInfo = localStorage.getItem("userInfo")

const userInfoFromStorage: CartItem[] = userInfo ? JSON.parse(userInfo) : null

const userLoginInitialState: UserLoginState = {
  status: 'idle',
  userInfo: userInfoFromStorage || null,
}





// start


export const getUserDetails = (id: any) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  console.log(id)
  const {
    userLogin: { userInfo },
  } = getState()

  try {
    dispatch(setUserDetailsRequest())

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
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

export const updateUserProfile = (user: any) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const {
    userLogin: { userInfo },
  } = getState()

  try {
    dispatch(setUserUpdateProfileRequest())

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
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

// end


export const login = createAsyncThunk("login", async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const { data } = await axios.post(
    "/api/users/login",
    { email, password },
    config
  )
  localStorage.setItem("userInfo", JSON.stringify(data))
  return data
})

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch(setUserLogout())
}

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: userLoginInitialState,
  reducers: {
    setUserLogout(state) {
      state.userInfo = null
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => { state.status = 'loading' })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'succeeded'
      state.userInfo = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})



export interface UserRegisterState extends UserLoginState {
  name: string
}

const userRegisterInitialState: UserRegisterState = {
  status: 'idle',
  userInfo: userInfoFromStorage || null,
  name: "",
}

export const register = createAsyncThunk('register', async (name: string,
  email: string,
  password: string) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const { data } = await axios.post(
    "/api/users",
    { name, email, password },
    config
  )

  dispatch(setUserRegisterSuccess(data))
  dispatch(setUserLoginSuccess(data))

  localStorage.setItem("userInfo", JSON.stringify(data))
})



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
