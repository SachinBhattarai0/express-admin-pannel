import React from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      className="transition relative flex w-full justify-center rounded border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
