import { State } from "../../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Dispatch } from "redux"
import { Link } from "../../common/types"
import { productMapper } from "./mapper"
import { ProductId } from "../Product/productSlice"

export type CartItem = {
  product: ProductId
  name: string
  image: Link
  price: number
  countInStock: number
  qty: number
}

export type ShippingAddress = {
  address: string
  city: string
  postalCode: string
  country: string
}

export enum PaymentMethod {
  PayPal = "PAYPAL",
}

export interface CartState {
  cartItems: Array<CartItem>
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}

const cartItems = localStorage.getItem("cartItems")
const cartItemsFromStorage: CartItem[] = cartItems ? JSON.parse(cartItems) : []

const shippingAddress = localStorage.getItem("shippingAddress")
const shippingAddressFromStorage = shippingAddress
  ? JSON.parse(shippingAddress)
  : {}

const initialState: CartState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: PaymentMethod.PayPal,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<CartItem>) {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
    },
    itemRemoved(state, action: PayloadAction<ProductId>) {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      )
    },
    addressSaved(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload
    },
    paymentMethodSaved(state, action: PayloadAction<any>) {
      state.paymentMethod = action.payload
    },
  },
})

export const {
  itemAdded,
  itemRemoved,
  addressSaved,
  paymentMethodSaved,
} = cartSlice.actions

export const addToCart = (id: ProductId, qty: number) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { data } = await axios.get(`/api/products/${id}`)

  const product = productMapper(data)

  dispatch(
    itemAdded({
      product: product.productId,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    })
  )
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: ProductId) => (
  dispatch: Dispatch,
  getState: () => State
) => {
  dispatch(itemRemoved(id))
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data: ShippingAddress) => (
  dispatch: Dispatch
) => {
  dispatch(addressSaved(data))
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data: PaymentMethod) => (
  dispatch: Dispatch
) => {
  dispatch(paymentMethodSaved(data))
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}
