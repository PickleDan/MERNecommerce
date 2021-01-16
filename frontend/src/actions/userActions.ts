import { Dispatch } from "redux"
import {
  setUserLoginRequest,
  setUserLoginSuccess,
  setUserLoginFail,
  setUserLogout,
  setUserRegisterRequest,
  setUserRegisterSuccess,
  setUserRegisterFail,
} from "../reducers/userReducers"
import axios from "axios"

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
