import {
  productListSlice,
  productDetailsSlice,
} from "./../features/Product/productSlice"
import { configureStore } from "@reduxjs/toolkit"
import {} from "../features/Product/productSlice"
import {
  userDetailsSlice,
  userLoginSlice,
  userRegisterSlice,
  userUpdateProfileSlice,
} from "../features/Profile/userSlice"
import { cartSlice } from "../features/Cart/cartSlice"
import {
  orderDetailsSlice,
  orderListMySlice,
  orderPaySlice,
  orderSlice,
} from "../features/PlaceOrder/orderSlice"

const store = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,
    orderCreate: orderSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderListMy: orderListMySlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type State = ReturnType<typeof store.getState>

export default store
