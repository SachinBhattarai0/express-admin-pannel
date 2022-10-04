import Button from "../components/Form/Button";
import { Link } from "react-router-dom";

const ContentTableHeader = () => {
  return (
    <div className="flex justify-between items-center bg-gray-50 px-3 pt-2 pb-0">
      <div className="relative mt-1 flex">
        <select
          name=""
          id=""
          className="border text-sm border-gray-300 bg-gray-50 outline-none text-gray-400 focus:border-blue-500"
        >
          <option value="1">Filter</option>
        </select>

        <input
          type="text"
          id="table-search"
          className="block outline-none p-2 w-64 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>

      <div className="flex space-x-1">
        <Link to={"create"}>
          <Button variant="green" size="sm">
            Add
          </Button>
        </Link>
        <Button variant="red" size="sm" disabled>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ContentTableHeader;
