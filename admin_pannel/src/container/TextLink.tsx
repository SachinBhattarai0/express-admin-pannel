import React from "react";
import { Link } from "react-router-dom";

const variants = {
  blue: "text-blue-500 dark:text-blue-400",
  red: "text-red-500 dark:text-red-540",
};

type TextLinkProps = {
  to: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
};

export const TextLink = ({ to, children, variant = "blue" }: TextLinkProps) => {
  return (
    <Link
      to={to}
      className={`font-medium hover:underline ${variants[variant]}`}
    >
      {children}
    </Link>
  );
};
