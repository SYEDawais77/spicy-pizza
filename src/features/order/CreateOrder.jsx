import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const [setUsername] = useState();
  const stateUsername = useSelector((state) => state.user.username);
  var totalPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const address = useSelector((state) => state.user.address);
  const isFetching = useSelector((state) => state.user.status);

  const position = useSelector((state) => state.user.position);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formDataError = useActionData();
  if (withPriority) {
    totalPrice = totalPrice + totalPrice * 0.2;
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }
  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="mr-2 px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="px-2 font-bold sm:basis-40">Full Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            placeholder="Your Full Name"
            defaultValue={stateUsername}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="px-2 font-bold sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full"
              placeholder="Valid Phone Number"
            />
            {formDataError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formDataError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="px-2 font-bold sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              placeholder="Your address"
              defaultValue={address}
              disabled={isFetching === "loading"}
            />
            {isFetching === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
            {!address && (
              <Button
                type="primary"
                className="absolute right-[0.1rem] z-50 mt-[0.1rem] sm:right-[0.08rem] sm:mt-[-0.1rem] sm:text-xs md:mt-[0.2rem]"
                onClick={handleClick}
              >
                {isFetching === "idle"
                  ? "Get Address"
                  : isFetching === "error"
                    ? "Error - Please Retry"
                    : "Loading Your Location"}
              </Button>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-6">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="latitude"
            value={(position?.latitude && position?.longitude) || ""}
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order.....!"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please enter a valid phone number, we might need it for delivery purpose.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
