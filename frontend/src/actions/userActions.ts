import { Dispatch } from "redux"
import {
  setUserLoginRequest,
  setUserLoginSuccess,
  setUserLoginFail,
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
