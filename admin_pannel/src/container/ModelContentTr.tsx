import Checkbox from "../components/Form/Checkbox";
import { TextLink } from "./TextLink";
import { AnyObj } from "../types/main";
import { stringify } from "querystring";

type ModelContextTrProps = {
  activeModelExtraFields: string[];
  modelValue: AnyObj;
  primaryKeyFields?: string[];
};

const ModelContentTr = ({
  activeModelExtraFields,
  modelValue,
  primaryKeyFields,
}: ModelContextTrProps) => {
  /* if there are multple primary key then returns stringified form of object ontaining key as pk identifier and value as value of pk */
  const primaryKey = primaryKeyFields?.reduce((pv, cv) => {
    let nv = JSON.parse(pv) as { [key: string]: string };
    nv[cv] = modelValue[cv];
    return JSON.stringify(nv);
  }, "{}");

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-3 w-4">
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
        <td className="py-3 px-6">{modelValue.__title__}</td>
      )}

      <td className="py-3 px-6 space-x-1 text-center">
        <TextLink to="#">Edit</TextLink>
        <TextLink variant="red">Delete</TextLink>
      </td>
    </tr>
  );
};

export default ModelContentTr;
