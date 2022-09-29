import { randomString, capitalizeFirstLetter } from "../../utils/StringUtils";

type inputProps = {
  name: string;
  checked?: boolean | string | undefined;
};

const Checkbox = (props: inputProps) => {
  const randomId = randomString();

  let checked = props.checked;
  /* if value of checked is given as string 'true' then convert to boolean true or fasle */
  if (typeof checked !== "boolean") {
    checked = checked === "true";
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={`${randomId}`}>
        {capitalizeFirstLetter(props.name)}:
      </label>
      <input
        id={`${randomId}`}
        type={"checkbox"}
        name={props.name}
        defaultChecked={checked}
        className="p-2 rounded outline-none border-2 border-gray-300 transition focus:border-indigo-600"
        placeholder={`Enter the value for ${props.name}`}
      />
    </div>
  );
};

export default Checkbox;
