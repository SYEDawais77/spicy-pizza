import React from "react";
import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((state) => state.user.username);
  if (!username) return;
  return (
    <div className="mr-4 hidden text-sm font-semibold sm:block lg:mr-6">
      <h1>Welcome, {username}!</h1>
    </div>
  );
}
