import React from "react";
import Spinner from "../../container/Spinner";

type ButtonProps = { children: React.ReactNode; isPending?: boolean };

const Button = ({ children, isPending = false }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`first-line:transition outline-none relative flex w-full justify-center rounded border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isPending && "pointer-events-none"
      }`}
    >
      {isPending ? <Spinner /> : <>{children}</>}
    </button>
  );
};

export default Button;
