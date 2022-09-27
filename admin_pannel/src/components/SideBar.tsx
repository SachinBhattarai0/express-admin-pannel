import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useActiveTableContext } from "../context/ActiveTableContext";
import { TableInfo } from "../types/main";

const SideBar = ({ fetchUrl }: { fetchUrl: string }) => {
  const { setActiveTable } = useActiveTableContext();
  const [tableInfos, setTableInfos] = useState<TableInfo[] | null>(null);

  const handleClick = (tableInfo: TableInfo) => {
    if (!setActiveTable) return;
    setActiveTable(tableInfo);
  };

  useEffect(() => {
    fetch(`${fetchUrl}/model-infos/`)
      .then((data) => data.json())
      .then((data) => setTableInfos(data));
  }, []);

  return (
    <div className="flex flex-col top-0 left-0 w-72 bg-white h-screen border-r">
      <div className="flex items-center justify-center h-[82px] border-b-2">
        <div>Express Admin Pannel</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
                  isActive && "bg-gray-50 text-gray-800 border-indigo-500"
                }`
              }
            >
              <span className="ml-2 text-sm tracking-wide truncate pl-4">
                Dashboard
              </span>
            </NavLink>
          </li>
          {tableInfos?.map((tableInfo, i) => (
            <li key={i}>
              <NavLink
                onClick={() => handleClick(tableInfo)}
                to={`/model/${tableInfo.tableName}`}
                className={({ isActive }) =>
                  `relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
                    isActive && "bg-gray-50 text-gray-800 border-indigo-500"
                  }`
                }
              >
                <span className="ml-2 text-sm tracking-wide truncate pl-4">
                  {tableInfo.tableName}
                </span>
              </NavLink>
            </li>
          ))}

          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Extras
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
