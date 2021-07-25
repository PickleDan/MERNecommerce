import axios from "axios";
import { ProductId, SourceProductDetails } from "../common/types";
import { productMapper } from "../features/Cart/mapper";
import { Dispatch } from "redux";
import {
  setProductDetailsFail,
  setProductDetailsRequest,
  setProductDetailsSuccess,
  setProductListFail,
  setProductListRequest,
  setProductListSuccess,
} from "./actionCreators";



export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setProductListRequest());

    const { data }: { data: Array<SourceProductDetails> } = await axios.get(
      "/api/products"
    );

    const convertedData = data.map(productMapper);

    dispatch(setProductListSuccess(convertedData));
  } catch (error) {
    dispatch(setProductListFail(error));
  }
};

// Get product details

export const listProductDetails = (id: ProductId) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setProductDetailsRequest());

    const { data }: { data: SourceProductDetails } = await axios.get(
      `/api/products/${id}`
    );

    const convertedData = productMapper(data);

    dispatch(setProductDetailsSuccess(convertedData));
  } catch (error) {
    dispatch(setProductDetailsFail(error));
  }
};
