import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Order #"
        className="w-32 rounded-full bg-yellow-100 px-3 py-2 text-sm text-stone-800 transition-all duration-500 focus:bg-yellow-100 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-30 focus:ring-offset-2 sm:focus:w-64 md:w-72"
      />
    </form>
  );
}
