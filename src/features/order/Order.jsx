// Test ID: IIDSAT
import OrderItem from "../order/OrderItem";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import Button from "../../ui/Button";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-700 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-700 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-2 rounded-sm bg-stone-300 px-2 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          />
        ))}
      </ul>
      {/* <div>
        <p>Name</p>
        <p>Phone number</p>
        <p>Address</p>
      </div> */}
      <div className="space-y-2 bg-stone-300 px-6 py-5">
        <p className="text-sm font-medium text-stone-500">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-500">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <fetcher.Form method="PATCH">
          <div className="text-right">
            <Button type="primary">Make This Priority Order</Button>
          </div>
        </fetcher.Form>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default Order;
