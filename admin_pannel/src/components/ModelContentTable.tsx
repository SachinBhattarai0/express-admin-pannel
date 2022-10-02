import { useEffect, useState } from "react";
import Pagination from "../container/Paginatinon";
import ContentTableHeader from "../container/ContentTableHeader";
import { postRequest } from "../utils/fetches";
import { TableInfo } from "../types/main";
import { useAlertContext } from "../context/AlertProvider";
import { AnyObj, Paginator } from "../types/main";
import ModelContentTr from "../container/ModelContentTr";
import { useAdminPannelOptions } from "../context/AdminPannelOptionsContext";
import Checkbox from "./Form/Checkbox";

type ContentProps = {
  activeTable: TableInfo | null;
};

type PaginatorState = { pager: Paginator | null; currentPage: number };

const Content = ({ activeTable }: ContentProps) => {
  const adminPannelOptions = useAdminPannelOptions();
  const { updateAlert } = useAlertContext();
  const [modelValues, setModelValues] = useState<AnyObj[]>([]);
  const [paginator, setPaginator] = useState<PaginatorState>({
    pager: null,
    currentPage: 1,
  });

  useEffect(() => {
    if (!activeTable) return;
    postRequest(
      `${window.fetchURL}/model-values/${activeTable?.tableName}?page=${paginator.currentPage}`,
      { paginate: true }
    ).then((data) => {
      if (data.error) return updateAlert!("some error occured");
      console.log(data.options);
      setModelValues([...data.options]);
      setPaginator({ pager: data.pager, currentPage: paginator?.currentPage });
    });
  }, [activeTable, paginator.currentPage]);

  let activeModelExtraFields: string[];
  let activeModelImageFields: string[];
  if (adminPannelOptions.titleFields) {
    activeModelExtraFields =
      adminPannelOptions.titleFields[activeTable?.tableName!];
  }
  if (adminPannelOptions.imageFields) {
    activeModelImageFields =
      adminPannelOptions.imageFields[activeTable?.tableName!];
  }

  return (
    <>
      <div className="relative overflow-hidden shadow-md sm:rounded m-4 border border-gray-300">
        <ContentTableHeader />

        <div className="overflow-y-scroll max-h-[60vh] custom-scroll">
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
                <ModelContentTr
                  key={i}
                  activeModelExtraFields={activeModelExtraFields}
                  activeModelImageFields={activeModelImageFields}
                  modelValue={modelValue}
                  setModelValues={setModelValues}
                  modelName={activeTable?.tableName}
                  primaryKeyFields={activeTable?.primaryKeyFields}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          pager={paginator?.pager}
          currentPage={paginator?.currentPage}
          setPaginator={setPaginator}
        />
      </div>
    </>
  );
};

export default Content;
