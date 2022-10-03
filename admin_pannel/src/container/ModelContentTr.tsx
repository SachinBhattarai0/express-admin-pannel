import Checkbox from "../components/Form/Checkbox";
import { TextLink } from "./TextLink";
import { AnyObj } from "../types/main";
import { postRequest } from "../utils/fetches";
import { useAlertContext } from "../context/AlertProvider";
import { clip } from "../utils/StringUtils";
import React, { useEffect, useState } from "react";

type ModelContextTrProps = {
  activeModelExtraFields: string[];
  activeModelImageFields: string[];
  modelValue: AnyObj;
  setModelValues: React.Dispatch<React.SetStateAction<AnyObj[]>>;
  modelName?: string;
  primaryKeyFields?: string[];
};

const ModelContentTr = ({
  activeModelExtraFields,
  activeModelImageFields,
  modelValue,
  setModelValues,
  modelName,
  primaryKeyFields,
}: ModelContextTrProps) => {
  const { updateAlert } = useAlertContext();

  /* if there are multple primary key then returns stringified form of object ontaining key as pk identifier and value as value of pk */
  const primaryKey = primaryKeyFields!.reduce((pv, cv) => {
    let nv = JSON.parse(pv) as { [key: string]: string };
    nv[cv] = modelValue[cv];
    return JSON.stringify(nv);
  }, "{}");

  const deleteOneHandler = async (josnPkStrng: string) => {
    const primaryKeyObj = JSON.parse(josnPkStrng);

    const response = await postRequest(
      `${window.fetchURL}/delete/${modelName}`,
      { where: primaryKeyObj }
    );
    if (response.error) return updateAlert!(response.message);
    updateAlert!(response.message, "SUCCESS");
    setModelValues(response.newValues);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-3 w-4">
        <div className="flex items-center">
          <Checkbox />
        </div>
      </td>

      {activeModelExtraFields ? (
        activeModelExtraFields.map((fieldname, i) => {
          let value = modelValue[fieldname];
          if (typeof value !== "string") value = `${value}`;

          if (activeModelImageFields?.includes(fieldname)) {
            return (
              <td className="py-1 px-4" key={i}>
                <img
                  alt={"error showing image"}
                  src={value}
                  className="p-1 h-14 w-14 rounded-full"
                />
              </td>
            );
          } else {
            return (
              <td key={i} className="py-3 px-6">
                {clip(value)}
              </td>
            );
          }
        })
      ) : (
        <td className="py-3 px-6">{clip(modelValue.__title__)}</td>
      )}

      <td className="py-3 px-6 space-x-1 text-center">
        <TextLink to="update" datas={modelValue}>
          Edit
        </TextLink>
        <TextLink variant="red" onClickFn={() => deleteOneHandler(primaryKey)}>
          Delete
        </TextLink>
      </td>
    </tr>
  );
};

export default ModelContentTr;
