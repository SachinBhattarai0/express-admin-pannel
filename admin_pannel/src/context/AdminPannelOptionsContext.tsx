import React, { useState, useEffect, createContext, useContext } from "react";
import { AdminPannelOptions } from "../types/main";

const AdminPannelOptionsProvider = createContext<AdminPannelOptions>({});

type AdminPannelContextProps = {
  children: React.ReactNode;
};

const AdminPannelOptionsContext = ({ children }: AdminPannelContextProps) => {
  useEffect(() => {
    fetch(`${window.fetchURL}/admin-pannel-options/`)
      .then((data) => data.json())
      .then((AdminPannelOpt) => {
        console.log(AdminPannelOpt);
        setadminPannelOptions({ ...AdminPannelOpt });
      });
  }, []);

  const [adminPannelOptions, setadminPannelOptions] =
    useState<AdminPannelOptions | null>(null);

  console.log(adminPannelOptions);
  return (
    <AdminPannelOptionsProvider.Provider value={{ ...adminPannelOptions }}>
      {children}
    </AdminPannelOptionsProvider.Provider>
  );
};

export const useAdminPannelOptions = () =>
  useContext(AdminPannelOptionsProvider);
export default AdminPannelOptionsContext;
