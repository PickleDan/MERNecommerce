// Product list

import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { ProductDetails } from "../common/types";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const setProductListRequest = () =>
  <const>{
    type: PRODUCT_LIST_REQUEST,
  };

export const setProductListSuccess = (productList: Array<ProductDetails>) =>
  <const>{
    type: PRODUCT_LIST_SUCCESS,
    payload: productList,
  };

export const setProductListFail = (error: any) =>
  <const>{
    type: PRODUCT_LIST_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };

// Product details

export const setProductDetailsRequest = () =>
  <const>{
    type: PRODUCT_DETAILS_REQUEST,
  };

export const setProductDetailsSuccess = (product: ProductDetails) =>
  <const>{
    type: PRODUCT_DETAILS_SUCCESS,
    payload: product,
  };

export const setProductDetailsFail = (error: any) =>
  <const>{
    type: PRODUCT_DETAILS_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };

// Cart

export const setCartItem = (cart: any, qty: number) =>
  <const>{
    type: CART_ADD_ITEM,
    payload: {
      product: cart.productId,
      name: cart.name,
      image: cart.image,
      price: cart.price,
      countInStock: cart.countInStock,
      qty,
    },
  };
