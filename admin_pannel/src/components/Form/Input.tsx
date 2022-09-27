import { randomString, capitalizeFirstLetter } from "../../utils/StringUtils";

type inputProps = {
  name: string;
  type?: string;
  defaultValue: string | undefined;
};

const Input = (props: inputProps) => {
  const randomId = randomString();
  return (
    <div className="flex flex-col">
      <label htmlFor={`${randomId}`}>
        {capitalizeFirstLetter(props.name)}:
      </label>
      <input
        id={`${randomId}`}
        type={props.type || "text"}
        name={props.name}
        defaultValue={props.defaultValue}
        className="p-2 rounded outline-none border-2 border-gray-300 transition focus:border-indigo-600"
        placeholder={`Enter the value for ${props.name}`}
      />
    </div>
  );
};

export default Input;
