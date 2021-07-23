import { Dispatch } from "redux"
import {
  setUserLoginRequest,
  setUserLoginSuccess,
  setUserLoginFail,
  setUserLogout,
  setUserRegisterRequest,
  setUserRegisterSuccess,
  setUserRegisterFail,
  setUserDetailsRequest,
  setUserDetailsSuccess,
  setUserDetailsFail,
  setUserUpdateProfileRequest,
  setUserUpdateProfileSuccess,
  setUserUpdateProfileFail,
} from "../features/Profile/userReducers"
import axios from "axios"
import { State } from "../app/store"

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setUserLoginRequest())

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

    dispatch(setUserLoginSuccess(data))

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch(
      setUserLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch(setUserLogout())
}

export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch(setUserRegisterRequest())

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
  } catch (error) {
    dispatch(
      setUserRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

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
