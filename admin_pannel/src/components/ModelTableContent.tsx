import { useEffect, useState } from "react";
import Pagination from "../container/Paginatinon";
import ContentTableHeader from "../container/ContentTableHeader";
import { TextLink } from "../container/TextLink";
import { postRequest } from "../utils/fetches";
import { TableInfo } from "../types/main";
import { useAlertContext } from "../context/AlertProvider";
import { AnyObj } from "../types/main";
import { useAdminPannelOptions } from "../context/AdminPannelOptionsContext";
import Checkbox from "./Form/Checkbox";

type ContentProps = {
  activeTable: TableInfo | null;
};

const Content = ({ activeTable }: ContentProps) => {
  const adminPannelOptions = useAdminPannelOptions();
  const { updateAlert } = useAlertContext();
  const [modelValues, setModelValues] = useState<AnyObj[]>([]);

  useEffect(() => {
    if (!activeTable) return;
    postRequest(
      `${window.fetchURL}/model-values/${activeTable?.tableName}`
    ).then((data) => {
      if (data.error) return updateAlert!("some error occured");
      setModelValues([...data]);
    });
  }, [activeTable]);

  let activeModelExtraFields: string[];
  if (adminPannelOptions.titleFields) {
    activeModelExtraFields =
      adminPannelOptions.titleFields[activeTable?.tableName!];
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded m-4 border border-gray-300">
      <ContentTableHeader />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox />
            </th>
            {activeModelExtraFields! ? (
              activeModelExtraFields.map((fieldname, i) => (
                <th scope="col" className="py-3 px-6" key={i}>
                  {fieldname}
                </th>
              ))
            ) : (
              <th scope="col" className="py-3 px-6">
                Title
              </th>
            )}

            <th scope="col" className="py-3 px-6 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {modelValues.map((modelValue, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <Checkbox />
                </div>
              </td>

              {activeModelExtraFields ? (
                activeModelExtraFields.map((fieldname, i) => (
                  <td className="py-4 px-6" key={i}>
                    {modelValue[fieldname]}
                  </td>
                ))
              ) : (
                <td className="py-4 px-6">{modelValue.__title__}</td>
              )}

              <td className="py-4 px-6 space-x-1 text-center">
                <TextLink to="#">Edit</TextLink>
                <TextLink to="#" variant="red">
                  Delete
                </TextLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
};

export default Content;
