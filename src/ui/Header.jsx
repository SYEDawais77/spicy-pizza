import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-4 border-stone-500 bg-yellow-400 px-4 py-3 font-semibold uppercase sm:px-6">
      <Link to="/" className="tracking-[.30em]">
        Spicy Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
