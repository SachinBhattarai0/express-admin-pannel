import React, { useState, useContext, createContext } from "react";

import { TAbleContext, TableInfo } from "../types/main";

const ActiveTableContext = createContext<TAbleContext>({
  activeTable: null,
  setActiveTable: null,
});

const ActiveTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTable, setActiveTable] = useState<TableInfo | null>(null);
  console.log(activeTable);

  return (
    <ActiveTableContext.Provider value={{ activeTable, setActiveTable }}>
      {children}
    </ActiveTableContext.Provider>
  );
};

export default ActiveTableProvider;
export const useActiveTableContext = () => useContext(ActiveTableContext);
