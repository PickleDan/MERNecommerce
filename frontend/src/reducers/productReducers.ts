import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { Link, ProductDetails, ProductId } from "../common/types";
import { ActionTypes } from "../store";

export interface ProductListState {
  loading: boolean;
  products: ProductDetails[];
  error?: string;
}

export const productListInitialState: ProductListState = {
  products: [],
  loading: false,
};

export const productListReducer = (
  state = productListInitialState,
  action: ActionTypes
): ProductListState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export interface ProductState {
  loading: boolean;
  product: ProductDetails;
  error?: string;
}

export const productInitialState: ProductState = {
  product: {
    productId: "" as ProductId,
    name: "",
    image: "" as Link,
    description: "",
    brand: "",
    category: "",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  loading: false,
};

export const productDetailsReducer = (
  state = productInitialState,
  action: ActionTypes
): ProductState => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
