import { Dispatch } from "redux";
import { ProductId } from "../common/types";
import { State } from "../app/store";
import axios from "axios";
import { productMapper } from "../mappers/productMapper";
import { removeItemFromCart, setCartItem } from "./actionCreators";

export const addToCart = (id: ProductId, qty: number) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const convertedData = productMapper(data);

  dispatch(setCartItem(convertedData, qty));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: ProductId) => (
  dispatch: Dispatch,
  getState: () => State
) => {
  dispatch(removeItemFromCart(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
