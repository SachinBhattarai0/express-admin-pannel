import React from "react";
import { useActiveTableContext } from "../context/ActiveTableContext";

const Body = () => {
  const { activeTable, setActiveTable } = useActiveTableContext();
  return <div>{activeTable?.tableName}</div>;
};

export default Body;
