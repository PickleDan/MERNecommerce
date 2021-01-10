import {
  Link,
  ProductDetails,
  ProductId,
  SourceProductDetails,
} from "../common/types";

export const productMapper = (data: SourceProductDetails): ProductDetails => ({
  productId: data._id as ProductId,
  name: data.name,
  image: data.image as Link,
  description: data.description,
  brand: data.brand,
  category: data.category,
  price: data.price,
  countInStock: data.countInStock,
  rating: data.rating,
  numReviews: data.numReviews,
});
