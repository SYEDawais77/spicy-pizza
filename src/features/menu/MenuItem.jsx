import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cart/cartSlice";
import { memo } from "react";
import IncreaseDecrease from "../cart/IncreaseDecrease";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const existingItem = cart.find((item) => item.pizzaId === id);

  function getQuantity() {
    if (existingItem) return existingItem.quantity;
    return 0;
  }

  const handleClick = (e) => {
    e.preventDefault();
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    // Check if the item is already in the cart, and update the quantity if so
    const existingItem = cart.find((item) => item.pizzaId === id);
    if (existingItem) {
      dispatch(removeFromCart(newItem.pizzaId));
      return;
    }
    dispatch(addToCart(newItem));
  };

  return (
    <li className="flex gap-4 px-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-75 grayscale" : ""}`}
      />
      <div className="mt-0.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-800">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-600">
              Sold out
            </p>
          )}
          <div className="flex items-center gap-4">
            {!soldOut && existingItem && (
              <IncreaseDecrease pizzaId={id} quantity={getQuantity()} />
            )}

            {!soldOut && !existingItem && (
              <Button type="small" onClick={handleClick}>
                Add to Cart
              </Button>
            )}
            {existingItem && (
              <Button
                type="small"
                className="px-2 py-2 text-sm sm:px-3 sm:py-2"
                onClick={handleClick}
              >
                Remove from Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(MenuItem);
