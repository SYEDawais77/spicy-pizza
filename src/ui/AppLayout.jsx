import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "./Loading";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {isLoading && <Loading />}
      <div className="overflow-auto">
        <main className="mx-auto max-w-2xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
