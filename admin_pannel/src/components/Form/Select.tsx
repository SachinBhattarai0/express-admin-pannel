import React from "react";

import { capitalizeFirstLetter, randomString } from "../../utils/StringUtils";

type inputProps = {
  name: string;
  defaultValue?: string;
  options: { name: string; value: string }[];
};

const Select = ({ defaultValue, name, options }: inputProps) => {
  return (
    <>
      <label htmlFor="countries" className="block mb-2 dark:text-gray-400">
        {capitalizeFirstLetter(name)}:
      </label>
      <select
        id="countries"
        className="bg-gray-50 border-2 border-gray-300 rounded  focus:border-indigo-600 transition block w-full p-2.5 "
      >
        {!defaultValue && <option selected>Choose a country</option>}
        {options.map((opt) => {
          return (
            <option value={opt.value} selected={defaultValue === opt.value}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
