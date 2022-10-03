import React from "react";
import { ModelInfo, relationModel } from "../../types/main";
import Select from "../Form/Select";

const RelationField = ({ fieldInfo }: { fieldInfo: ModelInfo }) => {
  if (!fieldInfo.relationWith?.options) return <div></div>;
  const options: relationModel[] = fieldInfo.relationWith!.options?.map(
    (item) => {
      const key = fieldInfo.relationWith!.key;
      return { name: item["__title__"] || item[key], value: item[key] };
    }
  );

  return (
    <Select
      name={fieldInfo.fieldName}
      defaultValue={fieldInfo.defaultValue}
      options={options}
    />
  );
};

export default RelationField;
