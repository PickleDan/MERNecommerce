import { CART_ADD_ITEM } from "../constants/cartConstants";
import { Link, ProductId } from "../common/types";
import { ActionTypes } from "../store";

export interface CartItem {
  product: ProductId;
  name: string;
  image: Link;
  price: number;
  countInStock: number;
  qty: number;
}

export interface CartState {
  cartItems: Array<CartItem>;
}

const cartInitialState: CartState = {
  cartItems: [],
};

export const cartReducer = (state = cartInitialState, action: ActionTypes) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
