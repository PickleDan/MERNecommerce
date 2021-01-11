import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  ProductListState,
  ProductState,
  productInitialState,
  productListInitialState,
} from "./reducers/productReducers";
import * as actions from "./actions/actionCreators";
import { CartItem, cartReducer, CartState } from "./reducers/cartReducers";

export interface State {
  productList: ProductListState;
  productDetails: ProductState;
  cart: CartState;
}

const reducer = combineReducers<State>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const cartItems = localStorage.getItem("cartItems");

const cartItemsFromStorage: CartItem[] = cartItems ? JSON.parse(cartItems) : [];

const initialState = {
  productList: productListInitialState,
  productDetails: productInitialState,
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  // @ts-ignore
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
