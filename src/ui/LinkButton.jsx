import React from "react";
import { Link,  useNavigate } from "react-router-dom";

export default function LinkButton({ children, to }) {
  const Navigate = useNavigate()
  const className =
    "text-sm text-blue-600 hover:font-bold hover:text-blue-700 hover:underline";
  if (to === "-1")
    return (
      <button className={className} onClick={() => Navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
