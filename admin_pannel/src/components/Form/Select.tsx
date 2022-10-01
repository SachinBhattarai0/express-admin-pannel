import React from "react";
import { clip } from "../../utils/StringUtils";

import { capitalizeFirstLetter, randomString } from "../../utils/StringUtils";

type inputProps = {
  name: string;
  defaultValue?: string;
  options: { name: string; value: string }[];
};

const Select = ({ defaultValue, name, options }: inputProps) => {
  const randomId = randomString();
  return (
    <>
      <label htmlFor={randomId} className="block mb-2 dark:text-gray-400">
        {capitalizeFirstLetter(name)}:
      </label>
      <select
        id={randomId}
        name={name}
        defaultValue={defaultValue}
        className="bg-gray-50 border-2 border-gray-300 rounded outline-none focus:border-indigo-600 transition block w-full p-2.5 "
      >
        <option value="">Choose a Value</option>
        {options.map((opt, i) => {
          return (
            <option
              value={opt.value}
              key={i}
              defaultChecked={defaultValue === opt.value}
            >
              {clip(opt.name, 70)}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
