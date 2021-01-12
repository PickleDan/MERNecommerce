import React, { useEffect } from "react";
import { Link, match } from "react-router-dom";
import { History } from "history";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { ProductId } from "../common/types";
import { State } from "../store";

type CartScreenProps = {
  match: match<MatchParams>;
  history: History;
  location: Location;
};

type MatchParams = {
  id: string;
};

const CartScreen = ({ match, location, history }: CartScreenProps) => {
  const productId = match.params.id as ProductId;

  const qty = location.search ? location.search.split("=")[1] : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state: State) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, +qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Cart</div>;
};

export default CartScreen;
