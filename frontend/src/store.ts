import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  ProductListState,
  ProductState,
} from "./reducers/productReducers";
import * as actions from "./actions/actionCreators";

export interface State {
  productList: ProductListState;
  productDetails: ProductState;
}

const reducer = combineReducers<State>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
