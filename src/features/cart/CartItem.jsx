import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { removeFromCart } from "./cartSlice";
import IncreaseDecrease from "./IncreaseDecrease";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    // Dispatch delete action
    e.preventDefault();
    dispatch(removeFromCart(pizzaId));
  };

  return (
    <li className="font-semibold sm:flex sm:justify-between">
      <p className="py-3 text-stone-800">
        {quantity}&times; {name}
      </p>

      <div className="flex items-center justify-between sm:gap-4">
        <IncreaseDecrease quantity={quantity} pizzaId={pizzaId} />
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button
          type="small"
          className="mb-2 sm:mb-0"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
