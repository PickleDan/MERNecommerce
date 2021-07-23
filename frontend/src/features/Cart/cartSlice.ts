import { State } from '../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Link, ProductId } from "../../common/types";
import { productMapper } from './productMapper';

export interface CartItem {
  product: ProductId
  name: string
  image: Link
  price: number
  countInStock: number
  qty: number
}

export interface CartState {
  cartItems: Array<CartItem>
}

const cartItems = localStorage.getItem("cartItems")

const cartItemsFromStorage: CartItem[] = cartItems ? JSON.parse(cartItems) : []

const initialState: CartState = {
  cartItems: cartItemsFromStorage,
}

const cartSlice = createSlice({
  name: 'cart',
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
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload)
    }
  }
})

export const { itemAdded, itemRemoved } = cartSlice.actions
export default cartSlice.reducer

// Thunks
export const addToCart = (id: ProductId, qty: number) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const product = productMapper(data);

  dispatch(itemAdded({
    product: product.productId,
    name: product.name,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    qty,
  }));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: ProductId) => (
  dispatch: Dispatch,
  getState: () => State
) => {
  dispatch(itemRemoved(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
