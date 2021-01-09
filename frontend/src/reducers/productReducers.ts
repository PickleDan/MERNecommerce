import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { ProductInfo } from "../common/types";
import { listProducts } from "../actions/productActions";

export interface ProductListState {
  loading: boolean;
  products: ProductInfo[];
  error?: string;
}

const initialState: ProductListState = {
  products: [],
  loading: false,
};

export const productListReducer = (
  state = initialState,
  action: any
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
