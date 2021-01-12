import { Dispatch } from "redux";
import { ProductId } from "../common/types";
import { State } from "../store";
import axios from "axios";
import { productMapper } from "../mappers/productMapper";
import { setCartItem } from "./actionCreators";

export const addToCart = (id: ProductId, qty: number) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const convertedData = productMapper(data);

  dispatch(setCartItem(convertedData, qty));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
