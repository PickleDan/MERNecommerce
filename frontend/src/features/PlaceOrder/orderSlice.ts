import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { State } from "../../app/store"
import axios from "axios"
import { Brand, RequestStatuses } from "../../common/types"
import { fetchListProducts, ProductDetails } from "../Product/productSlice"
import { CartItem, PaymentMethod, ShippingAddress } from "../Cart/cartSlice"
import { UserInfo } from "../Profile/userSlice"
import { Dispatch } from "redux"

export type OrderId = Brand<string, "order_id">

export type Order = {
  _id: OrderId
  orderItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  itemsPrice: number
  shippingPrice: number
  totalPrice: number
  createdAt: string
  user?: UserInfo
  isPaid: boolean
  paidAt?: string
  isDelivered?: boolean
  deliveredAt?: string
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

export type OrderDetails = {
  status: RequestStatuses
  order?: Order
  error?: string
}

const orderDetailsInitialState: OrderDetails = {
  status: "idle",
}

export const getOrderDetails = createAsyncThunk<
  Order,
  OrderId,
  { state: State }
>("order/getOrderDetails", async (orderId, thunkAPI) => {
  const {
    userLogin: { userInfo },
  } = thunkAPI.getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const { data } = await axios.get(`/api/orders/${orderId}`, config)

  return data
})

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: orderDetailsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      getOrderDetails.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.status = "succeeded"
        state.order = action.payload
      }
    )
    builder.addCase(getOrderDetails.rejected, (state) => {
      state.status = "failed"
      state.error = "Произошла ошибка при формировании заказа"
    })
  },
})

type PayOrder = {
  orderId: OrderId
  paymentResult: any
}

export const payOrder = createAsyncThunk<any, PayOrder, { state: State }>(
  "order/payOrder",
  async (params, thunkAPI) => {
    const {
      userLogin: { userInfo },
    } = thunkAPI.getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/orders/${params.orderId}/pay`,
      params.paymentResult,
      config
    )

    return data
  }
)

type OrderPay = Partial<{
  status: RequestStatuses
  pay: any
  error: string
}>

const orderPayInitialState: OrderPay = {}

export const orderPaySlice = createSlice({
  name: "orderDetails",
  initialState: orderPayInitialState,
  reducers: {
    orderPayReset(state) {
      state.status = "idle"
    },
  },
  extraReducers: (builder) => {
    builder.addCase(payOrder.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      payOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.status = "succeeded"
        state.pay = action.payload
      }
    )
    builder.addCase(payOrder.rejected, (state) => {
      state.status = "failed"
      state.error = "Произошла ошибка при оплате"
    })
  },
})

export const { orderPayReset } = orderPaySlice.actions

export const getMyOrders = createAsyncThunk<
  any,
  void,
  { state: State; dispatch: Dispatch }
>("order/payOrder", async (params, thunkAPI) => {
  const {
    userLogin: { userInfo },
  } = thunkAPI.getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const { data } = await axios.get(`/api/orders/myorders`, config)

  return data
})

type OrderListMy = {
  orders: Order[]
  status: RequestStatuses
  error?: string
}

const orderListMyInitial: OrderListMy = {
  orders: [],
  status: "idle",
}
export const orderListMySlice = createSlice({
  name: "orderDetails",
  initialState: orderListMyInitial,
  reducers: {
    myOrderListReset(state) {
      state.orders = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      getMyOrders.fulfilled,
      (state, action: PayloadAction<Order[]>) => {
        state.status = "succeeded"
        state.orders = action.payload
      }
    )
    builder.addCase(getMyOrders.rejected, (state) => {
      state.status = "failed"
      state.error = "Произошла ошибка при загрузке товаров"
    })
  },
})

export const { myOrderListReset } = orderListMySlice.actions
