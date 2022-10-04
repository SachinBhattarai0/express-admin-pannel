import Button from "./Form/Button";
import { Link } from "react-router-dom";
import { AnyObj, ModelInfo, PaginatorState } from "../types/main";
import { ChangeEvent, useEffect, useState } from "react";
import { postRequest } from "../utils/fetches";
import { useAlertContext } from "../context/AlertProvider";

interface ContentTableProps {
  fields: ModelInfo[];
  setModelValues: React.Dispatch<React.SetStateAction<AnyObj[]>>;
  modelName: String;
  paginator: PaginatorState;
  setPaginator: React.Dispatch<React.SetStateAction<PaginatorState>>;
  filtered: boolean;
  setFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentTableHeader = ({
  fields,
  modelName,
  setModelValues,
  paginator,
  setPaginator,
  filtered,
  setFiltered,
}: ContentTableProps) => {
  const { updateAlert } = useAlertContext();
  const [filerInfo, setFilerInfo] = useState({
    key: fields[0].fieldName,
    value: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    prop: string
  ) => {
    setFilerInfo({ ...filerInfo, [prop]: e.target.value });
  };

  useEffect(() => {
    if (filerInfo.value === "") {
      setFiltered(false);
    } else {
      setFiltered(true);
    }

    postRequest(
      `${window.fetchURL}/filter/${modelName}?page=${paginator.currentPage}`,
      {
        ...filerInfo,
        paginate: true,
      }
    ).then((data) => {
      if (data.error) return updateAlert!("cannot query by selected item");
      setModelValues([...data.options]);
      setPaginator({
        pager: data.pager,
        currentPage: paginator?.currentPage,
      });
    });
  }, [filerInfo, paginator.currentPage]);

  return (
    <div className="flex justify-between items-center bg-gray-50 px-3 pt-2 pb-0">
      <div className="relative mt-1 flex">
        <select
          onChange={(e) => handleChange(e, "key")}
          className="border w-14 text-sm border-gray-300 bg-gray-50 outline-none text-gray-500 focus:border-blue-500"
        >
          {fields?.map((field, i) => {
            if (field.fieldName === "__title__")
              return <option key={i} className="hidden"></option>;
            return (
              <option key={i} value={field.fieldName}>
                {field.fieldName}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          id="table-search"
          onChange={(e) => handleChange(e, "value")}
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
