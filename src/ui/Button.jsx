import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button({
  children,
  disabled,
  to,
  type,
  className,
  onClick,
}) {
  const navigate = useNavigate();

  const primaryStyles = `inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-500 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 sm:px-4 sm:py-3 disabled:cursor-not-allowed ${className}`;
  const smallStyles = `inline-block rounded-full bg-yellow-400 px-4 py-2 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-500 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 md:px-5 md:py-2.5 text-xs text-sm ${className} disabled:cursor-not-allowed `;

  const secondaryStyles = `inline-block rounded-full border-2 border-stone-400 font-semibold uppercase tracking-wide text-stone-500 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-4 disabled:cursor-not-allowed px-4 py-2.5 sm:px-4 sm:py-2.5 text-sm  ${className}`;

  const roundStyles = `inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-500 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 sm:px-4 sm:py-3 disabled:cursor-not-allowed  px-2.5 py-1 text-sm sm:px-3.5 sm:py-2   ${className}`;

  switch (type) {
    case "primary":
      if (to) {
        return (
          <button
            disabled={disabled}
            onClick={() => navigate(to)}
            className={primaryStyles}
          >
            {children}
          </button>
        );
      } else {
        return (
          <button
            disabled={disabled}
            onClick={onClick}
            className={primaryStyles}
          >
            {children}
          </button>
        );
      }
    case "small":
      return (
        <button disabled={disabled} onClick={onClick} className={smallStyles}>
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className={secondaryStyles}
        >
          {children}
        </button>
      );
    case "round":
      return (
        <button onClick={onClick} className={roundStyles}>
          {children}
        </button>
      );
  }
}
