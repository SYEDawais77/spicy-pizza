import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartItems, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const totalItems = useSelector(getTotalCartItems);
  const totalPrice = useSelector(getTotalCartPrice);

  if (totalItems === 0) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 font-semibold uppercase text-stone-200 sm:px-6">
      <p className="space-x-6 text-stone-300 sm:space-x-8">
        <span>{totalItems} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
