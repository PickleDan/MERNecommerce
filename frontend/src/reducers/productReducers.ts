import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { ProductInfo } from "../common/types";
import { listProducts } from "../actions/productActions";

export interface ProductListState {
  loading: boolean;
  products?: Array<ProductInfo>;
  error?: string;
}

export const productListReducer = (
  state: ProductListState = { products: [], loading: false },
  action: any
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
