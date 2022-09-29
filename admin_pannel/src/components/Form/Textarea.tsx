import { capitalizeFirstLetter, randomString } from "../../utils/StringUtils";

type inputProps = {
  name: string;
  defaultValue?: string;
};

const Textarea = ({ defaultValue, name }: inputProps) => {
  const randomId = randomString();
  return (
    <>
      <label htmlFor={`${randomId}`}>{capitalizeFirstLetter(name)}:</label>
      <textarea
        rows={4}
        name={name}
        id={randomId}
        value={defaultValue}
        className="block p-2.5 w-full  bg-gray-50 rounded border-2 border-gray-300 focus:border-indigo-600 dark:text-white outline-none transition"
        placeholder={"Enter value for " + name}
      ></textarea>
    </>
  );
};

export default Textarea;
