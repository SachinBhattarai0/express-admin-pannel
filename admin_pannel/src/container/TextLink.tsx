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
  datas?: unknown;
};

export const TextLink = ({
  children,
  onClickFn,
  to = "#",
  variant = "blue",
  datas,
}: TextLinkProps) => {
  return (
    <Link
      to={to}
      state={datas}
      onClick={onClickFn}
      className={`font-medium hover:underline ${variants[variant]}`}
    >
      {children}
    </Link>
  );
};
