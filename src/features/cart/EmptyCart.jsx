import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <p className="mb-5">
        Your cart is still empty. Start adding some pizzas :)
      </p>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
    </div>
  );
}

export default EmptyCart;
