import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { State } from "../../app/store"
import axios from "axios"
import { Brand, RequestStatuses } from "../../common/types"
import { fetchListProducts, ProductDetails } from "../Product/productSlice"
import { CartItem, PaymentMethod, ShippingAddress } from "../Cart/cartSlice"

export type OrderId = Brand<string, "order_id">

export type Order = {
  _id: OrderId
  orderItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  itemsPrice: number
  shippingPrice: number
  totalPrice: number
}

export const createOrder = createAsyncThunk<
  Order,
  Partial<Order>,
  { state: State }
>("order/createOrder", async (order, thunkAPI) => {
  const {
    userLogin: { userInfo },
  } = thunkAPI.getState()

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const { data } = await axios.post("/api/orders", order, config)

  return data
})

type OrderInitialState = {
  status: RequestStatuses
  error?: string
  order: Order | null
}

const orderInitialState: OrderInitialState = {
  status: "idle",
  order: null,
}

export const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.status = "succeeded"
        state.order = action.payload
      }
    )
    builder.addCase(createOrder.rejected, (state) => {
      state.status = "failed"
      state.error = "Произошла ошибка при формировании заказа"
    })
  },
})
