// Action creators of product list

import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { ProductDetails } from "../common/types";

export const setProductListRequest = () =>
  <const>{
    type: PRODUCT_LIST_REQUEST,
  };

export const setProductListSuccess = (convertedData: Array<ProductDetails>) =>
  <const>{
    type: PRODUCT_LIST_SUCCESS,
    payload: convertedData,
  };

export const setProductListFail = (error: any) =>
  <const>{
    type: PRODUCT_LIST_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };

// Action creators of product details

export const setProductDetailsRequest = () =>
  <const>{
    type: PRODUCT_DETAILS_REQUEST,
  };

export const setProductDetailsSuccess = (convertedData: ProductDetails) =>
  <const>{
    type: PRODUCT_DETAILS_SUCCESS,
    payload: convertedData,
  };

export const setProductDetailsFail = (error: any) =>
  <const>{
    type: PRODUCT_DETAILS_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  };
