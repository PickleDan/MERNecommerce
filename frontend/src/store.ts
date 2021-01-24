import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers"
import * as actions from "./actions/actionCreators"
import { cartReducer } from "./reducers/cartReducers"
import {
  userDetailsSlice,
  userLoginSlice,
  userRegisterSlice,
  userUpdateProfileSlice,
} from "./reducers/userReducers"
import { configureStore } from "@reduxjs/toolkit"

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type State = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,
  },
})

export default store
