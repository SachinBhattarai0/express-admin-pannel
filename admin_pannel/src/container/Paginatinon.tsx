import React from "react";
import { Paginator, PaginatorState } from "../types/main";

const ContentTablePaginatino = ({
  pager,
  currentPage,
  setPaginator,
}: {
  pager: Paginator | null;
  currentPage: number;
  setPaginator?: React.Dispatch<React.SetStateAction<PaginatorState>>;
}) => {
  if (!pager || pager.totalPages === 1) return <div></div>;

  return (
    <nav
      className="flex justify-between items-center bg-gray-50 p-4"
      aria-label="Table navigation"
    >
      {pager.pages && pager.pages.length && (
        <>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(pager.currentPage - 1) * pager.pageSize}-
              {pager.currentPage === pager.totalPages
                ? pager.totalItems
                : pager.currentPage * pager.pageSize}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {pager.totalItems}
            </span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <div
                onClick={() =>
                  setPaginator!({ pager: pager, currentPage: currentPage! - 1 })
                }
                className={`block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "pointer-events-none" : ""
                }`}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </li>

            {pager.pages.map((page, i) => {
              // if (page > currentPage + 5 || page < currentPage) return;
              return (
                <li key={i}>
                  <div
                    onClick={() =>
                      setPaginator!({
                        pager: pager,
                        currentPage: page,
                      })
                    }
                    className={`py-2 px-3 leading-tight border hover:text-gray-700 ${
                      currentPage === page
                        ? "bg-blue-50 text-blue-600 border-blue-300 hover:text-blue-700"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 "
                    }`}
                  >
                    {page}
                  </div>
                </li>
              );
            })}

            <li>
              <div
                onClick={() =>
                  setPaginator!({ pager: pager, currentPage: currentPage! + 1 })
                }
                className={`block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === pager.totalPages ? "pointer-events-none" : ""
                }`}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default ContentTablePaginatino;
