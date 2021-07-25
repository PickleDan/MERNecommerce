import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Link } from "../../common/types";
import { RequestStatuses, Brand } from './../../common/types';
import { productMapper } from './../Cart/mapper';

export type ProductId = Brand<string, 'product_id'>
export interface ProductDetails {
  productId: ProductId;
  name: string;
  image: Link;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ProductListState {
  status: RequestStatuses;
  error?: string;
  products: ProductDetails[];
}

export const productListInitialState: ProductListState = {
  status: 'idle',
  error: '',
  products: [],
};

/*Get product list*/
export const fetchListProducts = createAsyncThunk("products/fetchListProducts", async () => {
  const { data } = await axios.get(
    "/api/products"
  );

  const products = data.map(productMapper);
  return products
})

export const productListSlice = createSlice({
  name: 'productList',
  initialState: productListInitialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchListProducts.pending, (state) => { state.status = 'loading' })
    builder.addCase(fetchListProducts.fulfilled, (state, action: PayloadAction<ProductDetails[]>) => {
      state.status = 'succeeded'
      state.products = action.payload
    })
    builder.addCase(fetchListProducts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})



export interface ProductState {
  status: RequestStatuses;
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
  status: 'idle',
};

/*Get product details*/
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async (id: ProductId) => {
  const { data } = await axios.get(
    `/api/products/${id}`
  );

  const product = productMapper(data);
  return product
})


export const productDetailsSlice = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchProductDetails.pending, (state) => { state.status = 'loading' })
    builder.addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<ProductDetails>) => {
      state.status = 'succeeded'
      state.product = action.payload
    })
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

