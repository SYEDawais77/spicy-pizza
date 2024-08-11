import React from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
} from "./cartSlice";

export default function IncreaseDecrease({ quantity, pizzaId }) {
  const cart = useSelector((state) => state.cart.cart);
  const existingItem = cart.find((item) => item.pizzaId === pizzaId);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    // Dispatch update quantity action
    if (quantity < 5 && existingItem) {
      dispatch(increaseItemQuantity(pizzaId));
    }
  };

  const handleDecrease = () => {
    // Dispatch update quantity action
    if (quantity > 1 && existingItem) {
      dispatch(decreaseItemQuantity(pizzaId));
      return;
    } else {
      dispatch(removeFromCart(pizzaId));
    }
  };
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-2">
      <Button
        type="round"
        className="text-xs sm:text-xs"
        onClick={handleDecrease}
      >
        -
      </Button>
      <span className="text-semibold font-medium text-stone-800">
        {quantity}
      </span>
      <Button
        type="round"
        className="text-xs sm:text-xs"
        onClick={handleIncrease}
      >
        +
      </Button>
    </div>
  );
}
