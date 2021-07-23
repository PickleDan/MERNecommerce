import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "../features/Cart/cartSlice"
import {
  productDetailsReducer, productListReducer
} from "../features/Product/productReducers"
import {
  userDetailsSlice,
  userLoginSlice,
  userRegisterSlice,
  userUpdateProfileSlice
} from "../features/Profile/userReducers"

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartSlice,
    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export default store
