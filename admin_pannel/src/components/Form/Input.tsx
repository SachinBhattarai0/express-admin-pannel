import { randomString, capitalizeFirstLetter } from "../../utils/StringUtils";

type inputProps = {
  name: string;
  type?: string;
  defaultValue?: string;
};

const Input = ({ type, defaultValue, name }: inputProps) => {
  const randomId = randomString();
  return (
    <div className="flex flex-col">
      <label htmlFor={`${randomId}`}>{capitalizeFirstLetter(name)}:</label>
      <input
        id={`${randomId}`}
        type={type || "text"}
        name={name}
        defaultValue={defaultValue}
        className="p-2 rounded outline-none border-2 border-gray-300 transition focus:border-indigo-600"
        placeholder={`Enter the value for ${name}`}
      />
    </div>
  );
};

export default Input;
