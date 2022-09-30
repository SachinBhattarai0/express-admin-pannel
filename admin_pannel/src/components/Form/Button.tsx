import React from "react";
import Spinner from "../../container/Spinner";

const variants = {
  indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  gray: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
};

const sizes = {
  md: "p-2",
  sm: "p-1",
};

type ButtonProps = {
  children: React.ReactNode;
  isPending?: boolean;
  disabled?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

const Button = ({
  children,
  isPending = false,
  disabled = false,
  variant = "indigo",
  size = "md",
}: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`first-line:transition outline-none relative flex w-full justify-center rounded border border-transparent px-4 font-medium text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 ${
        isPending && "pointer-events-none"
      } ${variants[variant]} ${sizes[size]}`}
    >
      {isPending ? <Spinner /> : <>{children}</>}
    </button>
  );
};

export default Button;
