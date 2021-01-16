import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"
import { Link, ProductId } from "../common/types"
import { ActionTypes } from "../store"

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

const cartInitialState: CartState = {
  cartItems: cartItemsFromStorage,
}

export const cartReducer = (state = cartInitialState, action: ActionTypes) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    default:
      return state
  }
}
