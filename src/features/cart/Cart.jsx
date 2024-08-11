import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "../../features/cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  //const cart = fakeCart;
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleClearCart(e) {
    e.preventDefault();
    dispatch(clearCart());
  }

  return (
    <div className="px-4 py-3">
      {cart.length >= 1 && (
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      )}
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-6">{cart.length === 0 && <EmptyCart />}</div>
      {cart.length !== 0 && (
        <div className="mt-6 space-x-6">
          <Button type="primary" to="/order/new" disabled={cart.length == 0}>
            Order pizzas
          </Button>
          <Button
            disabled={cart.length === 0}
            type="secondary"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
