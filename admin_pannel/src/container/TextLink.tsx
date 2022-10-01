import React from "react";
import { Link } from "react-router-dom";

const variants = {
  blue: "text-blue-500 dark:text-blue-400",
  red: "text-red-500 dark:text-red-540",
};

type TextLinkProps = {
  to?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  onClickFn?: () => any;
};

export const TextLink = ({
  children,
  onClickFn,
  to = "#",
  variant = "blue",
}: TextLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClickFn}
      className={`font-medium hover:underline ${variants[variant]}`}
    >
      {children}
    </Link>
  );
};
