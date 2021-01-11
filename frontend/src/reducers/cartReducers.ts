import { CART_ADD_ITEM } from "../constants/cartConstants";

const cartInitialState = {
  cartItems: [],
};

export const cartReducer = (state = cartInitialState, action: any) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
    default:
      return state;
  }
};
